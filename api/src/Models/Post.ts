import { mongoose } from "./index";
import "./Restaurant";
import { postSchema } from "./schemas";
import { RawUserDocument } from "../../src/types/UserTypes";
import { RawRestaurantDocument } from "../../src/types/RestaurantTypes";
import {
  FindManyPromise,
  HydratedDocument
} from "../../src/types/MongooseCRUDTypes";
import type {
  RawPostDocument,
  PopulatedPostDocument
} from "../types/PostTypes";

const Post = mongoose.model<RawPostDocument>("Post", postSchema);

const batchSize = 15;

export const loadFeed = async function (
  user: HydratedDocument<RawUserDocument, "following">
): FindManyPromise<PopulatedPostDocument> {
  const feedPosts = await Post.find({
    author: { $in: [user._id, ...user.following] }
  })
    .sort({ createdAt: -1 })
    .limit(batchSize)
    .populate<{
      author: Pick<RawUserDocument, "_id" | "username" | "profileImageURL">;
      restaurant: RawRestaurantDocument;
      others: Pick<RawUserDocument, "_id" | "username" | "profileImageURL">[];
    }>([
      {
        path: "author",
        select: "username profileImageURL"
      },
      {
        path: "restaurant"
      },
      {
        path: "others",
        select: "username profileImageURL"
      }
    ]);
  return feedPosts;
};

export const loadMoreFeed = async function (
  user: HydratedDocument<RawUserDocument, "following">,
  lastCreatedAt: Date
): FindManyPromise<PopulatedPostDocument> {
  const nextBatch = await Post.find({
    author: { $in: [user._id, ...user.following] },
    createdAt: { $lt: lastCreatedAt }
  })
    .sort({ createdAt: -1 })
    .limit(batchSize)
    .populate<{
      author: Pick<RawUserDocument, "_id" | "username" | "profileImageURL">;
      restaurant: RawRestaurantDocument;
      others: Pick<RawUserDocument, "_id" | "username" | "profileImageURL">[];
    }>([
      {
        path: "author",
        select: "username profileImageURL"
      },
      {
        path: "restaurant"
      },
      {
        path: "others",
        select: "username profileImageURL"
      }
    ]);
  return nextBatch;
};

// // not setting restaurantID here yet as this value is being retrieved in the backend
// export const createNewPost = async function (
//   newPostData: ProcessedNewPostData
// ) {
//   const newPost = await Post.create({
//     // _id: id ? id : new mongoose.Types.ObjectId(),
//     ...newPostData
//   });
//   return newPost;
// };
