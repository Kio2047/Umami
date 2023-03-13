import { Types } from "mongoose";

import { NewPostDataWithRestaurantID, NewUserDataPostHash } from "./types";
import { RawRestaurantDocument } from "./MongooseCRUDTypes";

export interface NewDummyUserData extends NewUserDataPostHash {
  _id: Types.ObjectId;
  passwordHash: string;
  friends: Types.ObjectId[];
}

export interface NewDummyPostData extends NewPostDataWithRestaurantID {
  _id: Types.ObjectId;
}

export interface NewDummyRestaurantData extends RawRestaurantDocument {
  _id: Types.ObjectId;
}
