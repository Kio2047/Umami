// Only to be used when no excess properties are present in object
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ValueOf<T> = T[keyof T];

export type Tuple<T, L extends number> = [T, ...T[]] & { length: L };
