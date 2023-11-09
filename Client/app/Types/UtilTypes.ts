// Only to be used when no excess properties are present in object
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
