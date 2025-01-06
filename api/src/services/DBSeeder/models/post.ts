import { mongoose } from ".";
import { postSchema } from "../../../Models/schemas";
import { CreateOnePromise } from "../../../types/MongooseCRUDTypes";
import { RawPostDocument } from "../../../types/PostTypes";

const Post = mongoose.model<RawPostDocument>("Post", postSchema);

export const createNewDummyPost = async function (
  newDummyPostData: RawPostDocument
): CreateOnePromise<RawPostDocument> {
  const newDummyPost = await Post.create({
    ...newDummyPostData
  });
  return newDummyPost;
};
