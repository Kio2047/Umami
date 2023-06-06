import { Types } from "mongoose";

export interface RawUserDocument {
  email: string;
  passwordHash: string;
  name: string;
  username: string;
  profileImageURL: string;
  // TODO: consider using virtuals and an intermediary collection for many-many following / followers relationship
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
}

// export interface RawUserDocumentWithID extends RawUserDocument {
//   _id: Types.ObjectId;
// }

export interface NewUserData {
  email: string;
  name: string;
  username: string;
}

export interface ReceivedNewUserData extends NewUserData {
  password: string;
}

export interface ProcessedNewUserData extends NewUserData {
  profileImageURL: string;
  passwordHash: string;
}

export interface UserCredentials {
  usernameOrEmail: string;
  password: string;
}
