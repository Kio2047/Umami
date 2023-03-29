// import { mongoose } from "./index";
// const { Schema } = mongoose;

import { Schema } from "mongoose";

import { RawUserDocument } from "../types/UserTypes";
import { RawPostDocument } from "../types/PostTypes";
import { RawRestaurantDocument } from "../types/RestaurantTypes";

// TODO: Make the schema properties required where necessary
// TODO: remove _id from schema and corresponding interface if you can

// const makeAllFieldsRequired = function (obj: {
//   [key: string]:
// })

export const userSchema = new Schema<RawUserDocument>({
  // _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true, index: true },
  username: { type: String, required: true, unique: true, index: true },
  profileImageURL: { type: String, required: true },
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const postSchema = new Schema<RawPostDocument>({
  // _id: Schema.Types.ObjectId,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true
  },
  ratings: [Number],
  imageURLs: [String],
  timestamp: { type: Date, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  others: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const restaurantSchema = new Schema<RawRestaurantDocument>({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true }
  // cuisine: [String],
  // averageScore: Number,
  // location: String
});
