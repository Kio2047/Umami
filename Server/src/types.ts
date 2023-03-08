// import { ObjectId } from "bson"
import { Types } from "mongoose";
import { Request, Response } from "express";

export interface RawUserDocument {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  profilePictureURL: string;
  posts: Types.ObjectId[];
  friends: Types.ObjectId[];
}

export interface RawPostDocument {
  id: Types.ObjectId;
  author: Types.ObjectId;
  restaurant: Types.ObjectId;
  ratings: number[];
  imageURLs: string[];
  title: string;
  text: string;
  timestamp: Date;
  others?: Types.ObjectId[];
}

export interface RawRestaurantDocument {
  id: Types.ObjectId;
  name: string;
  posts: Types.ObjectId[];
}

export interface NewUserDetails {
  // The ID is provided in our DB seeder to make cross-collection referencing either.
  // In practice, users cannot provide the ID for their own account as our sanitization
  // would remove the ID if it was to be included in the request body
  _id?: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  profilePictureURL: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type RestaurantNewPost = {
  name: string;
  postID: Types.ObjectId;
};

export type UserAndPostIDs = {
  userID: Types.ObjectId;
  postID: Types.ObjectId;
};

//TODO - next type can also be the error handler which has different arguments

// export type ExpressErrorHandler
