import { Router } from "express";

import * as AuthenticationController from "./Controllers/authenticationController";
import * as PostController from "./Controllers/PostController";
import * as ImageUploadController from "./Controllers/ImageUploadController";

const router = Router();

router.post("/authenticate/check-user-exists", AuthenticationController.checkUserExists);
router.post("/authenticate/create-new-user", AuthenticationController.createNewUser);
router.post("/authenticate/check-user-credentials", AuthenticationController.checkUserCredentials);

router.get("/user/get-feed-posts/:userID", PostController.getFeedPosts);
router.get("/user/get-posts/:userID", PostController.getUserPosts);

// router.post("/user/create-new-post", (req, res) => {
//   console.log("hello")
//   res.status(200).send([1,2,3,4]);
// });

router.post("/user/create-new-post", PostController.createNewPost);
router.post("/user/save-images", ImageUploadController.upload.array("photos", 10), PostController.uploadImages);



export default router