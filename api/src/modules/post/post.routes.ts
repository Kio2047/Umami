import { Router } from "express";

import validatorGenerator from "../../middleware/validatorGenerator";
import authenticator from "../../middleware/authenticator";
import { getFeedPosts } from "./post.controller";
import { getFeedPostsSchemas } from "./post.validations";

const postRouter = Router();

postRouter.get(
  "/feed",
  authenticator,
  validatorGenerator(getFeedPostsSchemas),
  getFeedPosts
);

export default postRouter;
