import { HydratedDocument, Types } from "mongoose";

type Nullable<T> = T | null;

export type FindOneResult<
  Document,
  Fields extends keyof Document = keyof Document
> = Nullable<Omit<HydratedDocument<Document>, Exclude<keyof Document, Fields>>>;

export type NonNullFindOneResult<
  Document,
  Fields extends keyof Document = keyof Document
> = Omit<HydratedDocument<Document>, Exclude<keyof Document, Fields>>;

export type FindOnePromise<
  Document,
  Fields extends keyof Document = keyof Document
> = Promise<FindOneResult<Document, Fields>>;

export type UpdateOneResult<
  Document,
  Fields extends keyof Document = keyof Document
> = Omit<HydratedDocument<Document>, Exclude<keyof Document, Fields>>;

export type UpdateOnePromise<
  Document,
  Fields extends keyof Document = keyof Document
> = Promise<UpdateOneResult<Document, Fields>>;

export type CreateOneResult<Document> = HydratedDocument<Document>;

export type CreateOnePromise<Document> = Promise<CreateOneResult<Document>>;
