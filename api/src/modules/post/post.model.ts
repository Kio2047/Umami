import { mongoose } from "../../db/index";
import "../restaurant/restaurant.model";
import { postSchema } from "../../db/schemas";
import { RawUserDocument } from "../user/user.types";
import { RawRestaurantDocument } from "../restaurant/restaurant.types";
import { LeanDocument, LeanFindManyPromise } from "../../types/MongooseTypes";
import type { RawPostDocument, PopulatedPostDocument } from "./post.types";

const Post = mongoose.model<RawPostDocument>("Post", postSchema);

const batchSize = 15;

export const loadFeed = async function (
  user: LeanDocument<RawUserDocument, "following">
): LeanFindManyPromise<PopulatedPostDocument> {
  const feedPosts = await Post.find({
    author: { $in: [user._id, ...user.following] }
  })
    .lean()
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
  user: LeanDocument<RawUserDocument, "following">,
  lastCreatedAt: Date
): LeanFindManyPromise<PopulatedPostDocument> {
  const nextBatch = await Post.find({
    author: { $in: [user._id, ...user.following] },
    createdAt: { $lt: lastCreatedAt }
  })
    .lean()
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
