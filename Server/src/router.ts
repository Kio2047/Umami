import { Router } from "express";

import * as AuthenticationController from "./Controllers/authenticationController";
import * as PostController from "./Controllers/PostController";

const router = Router();

router.post("/authenticate/check-user-exists", AuthenticationController.checkUserExists);
router.post("/authenticate/create-new-user", AuthenticationController.createNewUser);
router.post("/authenticate/check-user-credentials", AuthenticationController.checkUserCredentials);

router.post("/user/get-posts", PostController.loadFeed);
router.post("/user/create-new-post", PostController.createNewPost);

export default router