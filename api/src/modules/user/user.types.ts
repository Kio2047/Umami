import { InferSchemaType } from "../../types/MongooseTypes";
import { userSchema } from "../../db/schemas";

export type RawUserDocument = InferSchemaType<typeof userSchema>;

// TODO: consider using virtuals and an intermediary collection for many-many following / followers relationship
