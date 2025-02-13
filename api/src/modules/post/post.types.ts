import { Types } from "mongoose";

import { InferSchemaType } from "../../types/MongooseTypes";
import { RawUserDocument } from "../user/user.types";
import { RawRestaurantDocument } from "../restaurant/restaurant.types";
import { postSchema } from "../../db/schemas";

export type RawPostDocument = InferSchemaType<typeof postSchema>;

export interface PopulatedPostDocument
  extends Omit<RawPostDocument, "author" | "restaurant" | "others"> {
  author: Pick<RawUserDocument, "_id" | "username" | "profileImageURL">;
  restaurant: RawRestaurantDocument;
  others: Pick<RawUserDocument, "_id" | "username" | "profileImageURL">[];
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
