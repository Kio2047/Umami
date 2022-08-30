import { mongoose } from "./index";
import type { PostData } from "../types";
import { postSchema } from "./schemas";

const Post = mongoose.model("Post", postSchema);

// not setting restaurantID here yet as this value is being retrieved in the backend
export const createNewPost = async function ({id, author, restaurant, ratings, imageURLs, title, text, timestamp, others}: PostData) {

  const newPost = await Post.create({
    _id: id ? id : new mongoose.Types.ObjectId(),
    author,
    restaurant,
    ratings,
    imageURLs,
    title,
    text,
    timestamp,
    others
  });
  return newPost;
}