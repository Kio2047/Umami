import { mongoose } from "./index";
import type { NewPostDataWithRestaurantID } from "../types/types";
import { postSchema } from "./schemas";

const Post = mongoose.model("Post", postSchema);

// not setting restaurantID here yet as this value is being retrieved in the backend
export const createNewPost = async function (
  newPostData: NewPostDataWithRestaurantID
) {
  const newPost = await Post.create({
    // _id: id ? id : new mongoose.Types.ObjectId(),
    ...newPostData
  });
  return newPost;
};
