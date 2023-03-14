import { Types } from "mongoose";

import { ProcessedNewUserData } from "./UserTypes";
import { ProcessedNewPostData } from "./PostTypes";
import { RawRestaurantDocument } from "./RestaurantTypes";

export interface NewDummyUserData extends ProcessedNewUserData {
  _id: Types.ObjectId;
  friends: Types.ObjectId[];
}

export interface NewDummyPostData extends ProcessedNewPostData {
  _id: Types.ObjectId;
  timestamp: string;
}

export interface NewDummyRestaurantData extends RawRestaurantDocument {
  _id: Types.ObjectId;
}
