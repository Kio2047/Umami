// import { mongoose } from "./index";
// const { Schema } = mongoose;

import { Schema } from "mongoose";

import { RawUserDocument } from "../modules/user/user.types";
import { RawPostDocument } from "../modules/post/post.types";
import { RawRestaurantDocument } from "../modules/restaurant/restaurant.types";

// TODO: Make the schema properties required where necessary
// TODO: remove _id from schema and corresponding interface if you can

// const makeAllFieldsRequired = function (obj: {
//   [key: string]:
// })

export const userSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    profileImageURL: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/di3penpbh/image/upload/v1678286761/user_profile_images/1200px-Default_pfp.svg_ewo17q.png"
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
      default: []
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

export const postSchema = new Schema(
  {
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
    scores: {
      type: {
        food: { type: Number, required: true, min: 1, max: 5 },
        atmosphere: { type: Number, required: true, min: 1, max: 5 },
        service: { type: Number, required: true, min: 1, max: 5 }
      },
      required: true
    },
    imageURLs: [String],
    title: { type: String, required: true },
    text: { type: String, required: true },
    others: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true
  }
);
postSchema.index({ author: 1, createdAt: -1 });

export const restaurantSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: { type: String, required: true }
    // cuisine: [String],
    // averageScore: Number,
    // location: String
  },
  {
    timestamps: true
  }
);
