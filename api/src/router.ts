import { Router } from "express";
import { body } from "express-validator";

import * as AuthController from "./Controllers/AuthenticationController";
import * as PostController from "./Controllers/PostController";
import * as ImageUploadController from "./Controllers/ImageUploadController";
import {
  createNewPostValidations,
  updateUserValidations,
  validateRequest
} from "./Modules/validations";
import * as UserController from "./Controllers/UserController";

const protectedRouter = Router();

protectedRouter.post(
  "/posts",
  createNewPostValidations,
  validateRequest,
  PostController.createNewPost
);

protectedRouter.patch(
  "/users/:id",
  updateUserValidations,
  validateRequest,
  UserController.updateUser
);

protectedRouter.get(
  "/media-upload-signature/profile-image",
  ImageUploadController.generateMediaUploadSignature
);

protectedRouter.get("/users/:id", UserController.getUserByID);

protectedRouter.get("/users", UserController.getUsersByQuery);

// protectedRouter.get("/user/get-feed-posts/:userID", PostController.getFeedPosts);

// router.post("/session", AuthController.checkUserExists);
// router.post(
//   "/authenticate/check-user-credentials",
//   AuthController.checkUserCredentials
// );

// router.get("/user/get-posts/:userID", PostController.getUserPosts);

// router.post("/user/create-new-post", (req, res) => {
//   res.status(200).send([1,2,3,4]);
// });

// router.post("/user/create-new-post", PostController.createNewPost);
// router.post(
//   "/user/save-images",
//   ImageUploadController.upload.array("photos", 10),
//   PostController.uploadImages
// );

export default protectedRouter;
