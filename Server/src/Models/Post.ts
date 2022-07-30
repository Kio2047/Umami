import { mongoose } from "./index";
import { postSchema } from "./schemas";

const Post = mongoose.model("Post", postSchema);
export { Post }