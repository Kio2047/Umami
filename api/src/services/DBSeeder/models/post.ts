import { mongoose } from ".";
import { postSchema } from "../../../db/schemas";
import { CreateOnePromise } from "../../../types/MongooseTypes";
import { RawPostDocument } from "../../../modules/post/post.types";

const Post = mongoose.model<RawPostDocument>("Post", postSchema);

export const createNewDummyPost = async function (
  newDummyPostData: RawPostDocument
): CreateOnePromise<RawPostDocument> {
  const newDummyPost = await Post.create({
    ...newDummyPostData
  });
  return newDummyPost;
};
