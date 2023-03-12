// import { ObjectId } from "bson"
import { HydratedDocument, Types } from "mongoose";

type Nullable<T> = T | null;

// export type Result<T> = Promise<Nullable<HydratedDocument<T>>>;

export type FindOneResult<T> = Nullable<HydratedDocument<T>>;

export type FindOnePromise<T> = Promise<FindOneResult<T>>;

export type CreateOneResult<T> = HydratedDocument<T>;

export type CreateOnePromise<T> = Promise<CreateOneResult<T>>;

export interface RawUserDocument {
  // _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  profilePictureURL: string;
  // TODO: consider using virtuals and an intermediary collection for many-many friends relationship
  friends: Types.ObjectId[];
}

export interface RawPostDocument {
  // _id: Types.ObjectId;
  author: Types.ObjectId;
  restaurant: Types.ObjectId;
  ratings: number[];
  imageURLs: string[];
  title: string;
  text: string;
  timestamp: Date;
  others: Types.ObjectId[];
}

export interface RawRestaurantDocument {
  // _id: Types.ObjectId;
  name: string;
}

export interface NewUserDetails {
  email: string;
  name: string;
  profilePictureURL: string;
}

export interface NewUserDetailsPreHash extends NewUserDetails {
  password: string;
}

export interface NewUserDetailsPostHash extends NewUserDetails {
  passwordHash: string;
}

export interface NewDummyUserDetails extends NewUserDetails {
  _id: Types.ObjectId;
  passwordHash: string;
  posts: Types.ObjectId[];
  friends: Types.ObjectId[];
}

interface NewPostDataBase {
  author: Types.ObjectId;
  ratings: [number, number, number];
  imageURLs: string[];
  title: string;
  text: string;
  others: Types.ObjectId[];
}

interface NewPostDataWithRestaurantName extends NewPostDataBase {
  newRestaurantName: string;
  restaurantID?: never;
}

export interface NewPostDataWithRestaurantID extends NewPostDataBase {
  restaurantID: Types.ObjectId;
  newRestaurantName?: never;
}

export type NewPostData =
  | NewPostDataWithRestaurantName
  | NewPostDataWithRestaurantID;

  export inter

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
