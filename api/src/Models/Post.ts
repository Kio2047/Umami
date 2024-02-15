import { mongoose } from "./index";
import type { RawPostDocument, ProcessedNewPostData } from "../types/PostTypes";
import { postSchema } from "./schemas";
import { NewDummyPostData } from "../types/SeedTypes";

const Post = mongoose.model<RawPostDocument>("Post", postSchema);

// not setting restaurantID here yet as this value is being retrieved in the backend
export const createNewPost = async function (
  newPostData: ProcessedNewPostData
) {
  const newPost = await Post.create({
    // _id: id ? id : new mongoose.Types.ObjectId(),
    ...newPostData
  });
  return newPost;
};

// For use in DB seeder only
export const createNewDummyPost = async function (
  newDummyPostData: NewDummyPostData
) {
  const newDummyPost = await Post.create({
    ...newDummyPostData
  });
  return newDummyPost;
};
