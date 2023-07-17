import { Router } from "express";
import { body } from "express-validator";

import * as AuthController from "./controllers/AuthenticationController";
import * as PostController from "./controllers/PostController";
import * as ImageUploadController from "./controllers/ImageUploadController";
import {
  createNewPostValidations,
  updateUserValidations,
  validateRequest
} from "./modules/validations";
import * as UserController from "./controllers/UserController";

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
//   console.log("hello")
//   res.status(200).send([1,2,3,4]);
// });

// router.post("/user/create-new-post", PostController.createNewPost);
// router.post(
//   "/user/save-images",
//   ImageUploadController.upload.array("photos", 10),
//   PostController.uploadImages
// );

export default protectedRouter;
