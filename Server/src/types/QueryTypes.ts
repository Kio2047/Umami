import { HydratedDocument } from "mongoose";

type Nullable<T> = T | null;

// export type Result<T> = Promise<Nullable<HydratedDocument<T>>>;

export type FindOneResult<T> = Nullable<HydratedDocument<T>>;

export type FindOnePromise<T> = Promise<FindOneResult<T>>;

export type CreateOneResult<T> = HydratedDocument<T>;

export type CreateOnePromise<T> = Promise<CreateOneResult<T>>;
