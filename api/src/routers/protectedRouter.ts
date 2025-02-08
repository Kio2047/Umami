import { Router } from "express";

import * as ImageUploadController from "../Controllers/ImageUploadController";
import * as UserController from "../Controllers/UserController";
import * as PostController from "../Controllers/PostController";
import {
  getFeedPostsSchemas,
  getImageUploadSignatureSchema
} from "../Modules/validations";
import validatorGenerator from "../middleware/validatorGenerator";

const protectedRouter = Router();

protectedRouter.get(
  "/feed",
  validatorGenerator(getFeedPostsSchemas),
  PostController.getFeedPosts
);

protectedRouter.get(
  "/image-upload-signature/:folder",
  validatorGenerator(getImageUploadSignatureSchema),
  ImageUploadController.generateImageUploadSignature
);

// protectedRouter.patch(
//   "/users/me",
//   updateUserValidations,
//   requestValidator,
//   UserController.updateUser
// );

export default protectedRouter;
