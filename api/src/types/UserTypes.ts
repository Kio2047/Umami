import { Types } from "mongoose";

export interface RawUserDocument {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  username: string;
  profileImageURL: string;
  // TODO: consider using virtuals and an intermediary collection for many-many following / followers relationship
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export type UpdatableUserField = keyof Exclude<
  RawUserDocument,
  "_id" | "createdAt" | "updatedAt"
>;

// export interface RawUserDocumentWithID extends RawUserDocument {
//   _id: Types.ObjectId;
// }

export type HashedNewUserCredentials = Omit<NewUserCredentials, "password"> & {
  passwordHash: string;
};
