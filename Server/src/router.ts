import { Router } from "express";
import { body } from "express-validator";

import * as AuthController from "./Controllers/AuthController";
import * as PostController from "./Controllers/PostController";
import * as ImageUploadController from "./Controllers/ImageUploadController";
import { createNewUserValidations } from "./Modules/validate";

const router = Router();

router.post("/user", createNewUserValidations, AuthController.createNewUser);
router.post("/session", AuthController.loginUser);
// router.post("/session", AuthController.checkUserExists);
// router.post(
//   "/authenticate/check-user-credentials",
//   AuthController.checkUserCredentials
// );

// router.get("/user/get-feed-posts/:userID", PostController.getFeedPosts);
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

export default router;
