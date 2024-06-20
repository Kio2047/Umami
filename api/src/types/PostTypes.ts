import { Types } from "mongoose";

export interface RawPostDocument {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  restaurant: Types.ObjectId;
  ratings: number[];
  imageURLs: string[];
  title: string;
  text: string;
  others: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

interface NewPostDataBase {
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

interface NewPostDataWithRestaurantID extends NewPostDataBase {
  restaurantID: Types.ObjectId;
  newRestaurantName?: never;
}

export type NewPostData =
  | NewPostDataWithRestaurantName
  | NewPostDataWithRestaurantID;

// export interface PostData extends NewPostDataBase {
//   author: Types.ObjectId;
//   restaurant: Types.ObjectId;
// }
