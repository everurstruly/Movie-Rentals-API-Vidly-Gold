export const sortOrders = ['asc', 'desc'] as const;
export const logicalOperators = ['$and', '$not', '$or'] as const;
export const comparisonOperators = [
  '$eq',
  '$ne',
  '$in',
  '$nin',
  '$gt',
  '$lt',
  '$gte',
  '$lte',
] as const;

export type SortOrder = typeof sortOrders[number];
export type LogicalOperator = typeof logicalOperators[number];
export type ComparisonOperator = typeof comparisonOperators[number];

export type FieldSelections<F> = {
  included?: F[];
} & ({ selected?: F[] } | { excluded?: F[] });

export type NarrorwFilter<Document> = {
  where?: { [K in keyof Document]?: Document[keyof Document] };
};

export type BroadFilter<Document> = {
  where?: {
    [OP in LogicalOperator]?: {
      field: keyof Document;
      operator: ComparisonOperator;
      value: any;
    }[];
  };
};

export type FindOptions<Document> = {
  fields?: FieldSelections<keyof Document>;
  sort?: {
    field: keyof Document;
    order: SortOrder;
  };
  pagination?: XOR<
    { limit: number },
    {
      pageNumber: number;
      pageItemsSize: number;
    }
  >;
} & (BroadFilter<Document> | NarrorwFilter<Document>);

export type DocumentId = string;
export type DocumentDto = Record<string, any>;

export interface Repository<Document extends DocumentDto> {
  find(options: FindOptions<Document>): Promise<Document[] | null>;

  findDuplicate(dto: DocumentDto): Promise<Document | null>;

  createOne(dto: DocumentDto): Promise<Document>;

  getOne(
    id: DocumentId,
    fields: FieldSelections<Document>
  ): Promise<Document | null>;

  updateOne(
    id: DocumentId,
    dto: DocumentDto
  ): Promise<(keyof Document)[] | null>;

  deleteOne(id: DocumentId): Promise<DocumentId | null>;
}
