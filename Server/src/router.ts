import { Router } from "express";

import * as AuthenticationController from "./Controllers/authenticationController";
import * as FeedController from "./Controllers/FeedController";

const router = Router();

router.post("/authenticate/does-user-exist", AuthenticationController.checkUserExists);
router.post("/authenticate/create-new-user", AuthenticationController.createNewUser);
router.post("/authenticate/check-user-credentials", AuthenticationController.checkUserCredentials);

router.post("/feed/get-all-posts", FeedController.loadFeed)
export default router