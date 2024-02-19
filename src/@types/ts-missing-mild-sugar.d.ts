declare type SoftWritable<T> = { -readonly [P in keyof T]: T[P] };

declare type Without<T, U> = {
  [K in Exclude<keyof T, keyof U>]?: never;
};

declare type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

declare type WithRequired<T extends object, K extends keyof T> = T &
  Required<Pick<T, K>>;

declare type WithOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Pick<Partial<T>, K>;
