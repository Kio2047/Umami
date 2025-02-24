import {
  Document,
  Types,
  InferSchemaType as MongooseInferSchemaType
} from "mongoose";

type Nullable<T> = T | null;

export type LeanDocument<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Pick<DocumentType, Fields> & { _id: Types.ObjectId };

export type NullableLeanDocument<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Nullable<LeanDocument<DocumentType, Fields>>;

export type HydratedDocument<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Document & Pick<DocumentType, Fields> & { _id: Types.ObjectId };

export type NullableHydratedDocument<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Nullable<HydratedDocument<DocumentType, Fields>>;

export type CreateOnePromise<DocumentType> = Promise<
  HydratedDocument<DocumentType>
>;

export type LeanFindOnePromise<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Promise<NullableLeanDocument<DocumentType, Fields>>;

export type FindOnePromise<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Promise<NullableHydratedDocument<DocumentType, Fields>>;

export type LeanFindManyPromise<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Promise<LeanDocument<DocumentType, Fields>[]>;

export type FindManyPromise<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Promise<HydratedDocument<DocumentType, Fields>[]>;

export type UpdateOnePromise<
  DocumentType,
  Fields extends keyof DocumentType = keyof DocumentType
> = Promise<HydratedDocument<DocumentType, Fields>>;

export type InferSchemaType<T> = MongooseInferSchemaType<T> & {
  _id: Types.ObjectId;
};

// export type UpdateOneResult<
//   Document,
//   Fields extends keyof Document = keyof Document
// > = Omit<HydratedDocument<Document>, Exclude<keyof Document, Fields>>;

// export type UpdateOnePromise<
//   Document,
//   Fields extends keyof Document = keyof Document
// > = Promise<UpdateOneResult<Document, Fields>>;

// export type CreateOneResult<Document> = HydratedDocument<Document>;
