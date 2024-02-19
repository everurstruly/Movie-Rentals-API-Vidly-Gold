export type ObjectIdString = string;

export type DeferedSeedField<T> =
  | T
  | {
      fillBy: { [field: string]: any };
      subWith: T;
    };
