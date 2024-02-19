import mongoose from 'mongoose';
import * as projService from 'src/core/services/_repository';
import * as objliteralUtils from 'src/common/utils/datatype/object-literal-utils';

type SelectFieldQueryItemVisibility = '' | '+' | '-';
type SelectFieldQueryItem<F extends string> =
  `${SelectFieldQueryItemVisibility}${F}`;

type SelectFieldQuery<F extends string> = SelectFieldQueryItem<F>[];

type FilterQueryItem<D> = {
  [F in keyof D]: {
    [ComparisonOP in projService.ComparisonOperator]?: D[F];
  };
};

type FilterQuery<D> = {
  [LogicalOP in projService.LogicalOperator]?: FilterQueryItem<D>[];
};

//

const mapToFindQueryFields = <D>(
  fields: projService.FieldSelections<keyof D>
) => {
  type F = keyof D extends string ? keyof D : never;
  const { included = [] } = fields as Extract<F, { included?: string[] }>;
  const { selected } = fields as Extract<F, { selected?: string[] }>;
  const { excluded } = fields as Extract<F, { excluded?: string[] }>;

  const mapToSelectFieldQuery = (
    selections: string[],
    visibility: SelectFieldQueryItemVisibility
  ) => {
    return selections.map(
      (s) => `${visibility}${s.trim()}`
    ) as SelectFieldQuery<F>;
  };

  if (selected) {
    return [
      ...mapToSelectFieldQuery(selected, ''),
      ...mapToSelectFieldQuery(included, '+'),
    ];
  }

  if (excluded) {
    return [
      ...mapToSelectFieldQuery(excluded, '-'),
      ...mapToSelectFieldQuery(included, '+'),
    ];
  }

  return [] as SelectFieldQuery<F>;
};

const mapToFindQueryFilters = <D>(
  filters: projService.FindOptions<D>['where'] = {}
) => {
  const filtersKeys = objliteralUtils.objectKeys(filters);
  let filtersToTransform = filters as NonNullable<
    projService.BroadFilter<D>['where']
  >;

  if (!projService.logicalOperators.includes(filtersKeys[0])) return filters;

  return Object.keys(filtersToTransform).reduce((query, operator) => {
    const logicalOperator = operator as projService.LogicalOperator;
    const operand = filtersToTransform[logicalOperator]?.map((filter) => {
      const { field, operator, value } = filter;
      return { [field]: { [operator]: value } } as FilterQueryItem<D>;
    });

    if (operand) query[logicalOperator] = operand;
    return query;
  }, {} as FilterQuery<D>);
};

const mapToFindQueryPagination = ({
  pagination,
}: {
  pagination: projService.FindOptions<unknown>['pagination'];
}) => {
  if (typeof pagination === 'undefined') return { skip: 0, limit: 0 };
  const { limit, pageNumber = 0, pageItemsSize = 0 } = pagination;
  if (typeof limit === 'number') return { skip: 0, limit };
  const currentPageIndex = Math.max(0, pageNumber - 1);
  const indexToPaginateFrom = currentPageIndex * pageItemsSize;
  return { skip: indexToPaginateFrom, limit: pageItemsSize };
};

export function mapToFindQuery<D>(options: projService.FindOptions<D>) {
  return {
    ...options,
    fields: mapToFindQueryFields<D>(options.fields || {}),
    filters: mapToFindQueryFilters<D>(options.where),
    ...mapToFindQueryPagination({
      pagination: options.pagination,
    }),
  };
}

//

// CreateRepository: is mainly for convience, also with hopes of
// avoid to write very similar code. One could simply
// export and utilize the request-to-query mapping-functions only
export const CreateRepository = <
  Document extends Record<string, any>,
  Schema = mongoose.Schema<Document>
>(
  Model: mongoose.Model<Document, {}, {}, {}, Schema>,
  execute: {
    findDuplicate: projService.Repository<Document>['findDuplicate'];
  }
) => {
  return class implements projService.Repository<Document> {
    find = async (
      options: projService.FindOptions<Document>
    ): Promise<Document[]> => {
      const { fields, filters, sort, skip, limit } =
        mapToFindQuery<Document>(options);

      return Model.find(filters)
        .sort(sort as any)
        .skip(skip)
        .limit(limit)
        .select(fields);
    };

    findDuplicate = async (dto: projService.DocumentDto) => {
      return execute.findDuplicate.call(this, dto);
    };

    createOne = async (dto: projService.DocumentDto) => {
      const newDoc = new Model(dto);
      newDoc.schema;
      return newDoc.save();
    };

    getOne = async (
      id: projService.DocumentId,
      fields?: projService.FieldSelections<Document>
    ) => {
      return Model.findById(id).select(fields);
    };

    updateOne = async (
      id: projService.DocumentId,
      dto: projService.DocumentDto
    ) => {
      const docToUpdate = await Model.findById(id);
      if (docToUpdate === null) return null;
      objliteralUtils.updateOneByOther(docToUpdate, dto);
      const modifiedFields = docToUpdate.modifiedPaths();
      await docToUpdate.save();
      return modifiedFields as unknown as (keyof Document)[];
    };

    deleteOne = async (id: projService.DocumentId) => {
      const docDeletion = await Model.deleteOne({ _id: id });
      if (docDeletion.deletedCount === 0) return null;
      if (!docDeletion.acknowledged) {
        throw new Error(JSON.stringify(docDeletion));
      }

      return id;
    };
  };
};
