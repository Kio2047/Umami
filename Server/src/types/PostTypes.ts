import { Types } from "mongoose";

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

interface NewPostDataBase {
  author: Types.ObjectId;
  ratings: [number, number, number];
  imageURLs: string[];
  restaurant: Types.ObjectId;
  title: string;
  text: string;
  others: Types.ObjectId[];
}

interface NewPostDataWithRestaurantName extends NewPostDataBase {
  newRestaurantName: string;
  restaurantID?: never;
}

interface NewPostDataWithRestaurantID extends NewPostDataBase {
  restaurantID: Types.ObjectId;
  newRestaurantName?: never;
}

export type ReceivedNewPostData =
  | NewPostDataWithRestaurantName
  | NewPostDataWithRestaurantID;

export interface ProcessedNewPostData extends NewPostDataBase {
  restaurant: Types.ObjectId;
}
