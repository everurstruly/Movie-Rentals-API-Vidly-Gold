//

export type DomainHref = `/${string}`;

export type DataItem = any;

export type MetaSort = {
  field: string;
  order: 'ascending' | 'descending';
};

export type MetaFilter = {
  field: string;
  value: any | any[];
};

export type MetaPagination = {
  pageNumber: number;
  pageItemsSize: number;
  totalPages: number;
  totalItems: number;
};

export type LinksRoot =
  | {
      self: DomainHref;
    }
  | {
      self: DomainHref;
      first: DomainHref;
      last: DomainHref;
      prev: DomainHref;
      next: DomainHref;
    };

export type LinksRelated = {
  href: string;
  label?: string;
  groupLabel?: string;
};

export type DataMeta = {
  [key: string]: any;
  copyright?: string;
  sort?: MetaSort;
  filters?: MetaFilter[];
  pagination?: MetaPagination;
};

export type DataResponse = {
  statusCode: number;
  message?: string;
  items: DataItem | DataItem[];
  included?: {
    [dataItemsLabel: string]: DataItem[];
  };
  meta?: DataMeta;
  links?: LinksRoot & {
    related: LinksRelated | LinksRelated[] | null;
  };
};

type DataResponseMessageContext = {
  statusCode: DataResponse['statusCode'];
  message?: DataResponse['message'];
  resourceName?: DataResponse['message'];
};

export class HttpDataResponseFormatter {
  statusCode;
  items: DataResponse['items'] = null;
  included: DataResponse['included'];
  metadata: DataResponse['meta'];

  buildMessage;
  buildLinks;
  useFormatting;

  constructor(options: {
    statusCode: DataResponse['statusCode'];
    buildMessage: (context: DataResponseMessageContext) => string | undefined;
    buildLinks: (meta: DataResponse['meta']) => DataResponse['links'];
    useFormatting: (formatting: DataResponse) => any;
  }) {
    const { statusCode, buildMessage, buildLinks, useFormatting } = options;
    this.statusCode = statusCode;
    this.buildMessage = buildMessage;
    this.buildLinks = buildLinks;
    this.useFormatting = useFormatting;
  }

  addItems = (data: DataResponse['items']) => {
    if (Array.isArray(data)) {
      this.items = data.flatMap((i) => i);
      return this;
    }

    this.items = data;
    return this;
  };

  addIncluded = (
    ...data: {
      label: string;
      items: NonNullable<DataResponse['included']>['label'];
    }[]
  ) => {
    if (typeof this.included === 'undefined') this.included = {};
    for (const dataIncluded of data) {
      const { label, items } = dataIncluded;
      const prevItems = this.included[label];
      this.included[label] = [...prevItems, ...items].flatMap((i) => i);
    }

    return this;
  };

  addSort = (sort: WithOptional<NonNullable<DataMeta['sort']>, 'order'>) => {
    const { field, order = 'ascending' } = sort;
    this.metadata = {
      ...this.metadata,
      sort: { field, order },
    };

    return this;
  };

  addFilters = (...filters: NonNullable<DataMeta['filters']>) => {
    this.metadata = {
      ...this.metadata,
      filters,
    };

    return this;
  };

  addPagination = (pagination: NonNullable<DataMeta['pagination']>) => {
    this.metadata = {
      ...this.metadata,
      pagination,
    };

    return this;
  };

  use = (context: Omit<DataResponseMessageContext, 'statusCode'>) => {
    const { statusCode, items, included, metadata } = this;
    const message = this.buildMessage({ statusCode, ...context });
    const links = this.buildLinks(this.metadata);
    return this.useFormatting({
      statusCode,
      message,
      items,
      included,
      meta: metadata,
      links,
    });
  };
}
