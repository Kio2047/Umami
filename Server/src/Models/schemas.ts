// import { mongoose } from "./index";
// const { Schema } = mongoose;

import { Schema } from "mongoose";

import {
  RawPostDocument,
  RawRestaurantDocument,
  RawUserDocument
} from "../types/types";

// TODO: Make the schema properties required where necessary
// TODO: remove _id from schema and corresponding interface if you can

// const makeAllFieldsRequired = function (obj: {
//   [key: string]:
// })

export const userSchema = new Schema<RawUserDocument>({
  // _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  profilePictureURL: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const postSchema = new Schema<RawPostDocument>({
  // _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  ratings: [Number],
  imageURLs: [String],
  timestamp: Date,
  title: String,
  text: String,
  others: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const restaurantSchema = new Schema<RawRestaurantDocument>({
  // _id: Schema.Types.ObjectId,
  name: String
  // cuisine: [String],
  // averageScore: Number,
  // location: String
});
