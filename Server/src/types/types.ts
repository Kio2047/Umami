// import { ObjectId } from "bson"
import { Types } from "mongoose";

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
