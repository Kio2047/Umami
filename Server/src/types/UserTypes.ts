import { Types } from "mongoose";

export interface RawUserDocument {
  // _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  username: string;
  profilePictureURL: string;
  // TODO: consider using virtuals and an intermediary collection for many-many following / followers relationship
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
}

export interface NewUserData {
  email: string;
  name: string;
  username: string;
  profilePictureURL: string;
}

export interface ReceivedNewUserData extends NewUserData {
  password: string;
}

export interface ProcessedNewUserData extends NewUserData {
  passwordHash: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
