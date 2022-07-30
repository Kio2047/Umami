import { Router } from "express";

import * as AuthenticationController from "./Controllers/authenticationController";

const router = Router();

router.post("/authenticate/does-user-exist", AuthenticationController.checkUserExists);
// router.post("/login", );
// router.get("/feed", );

export default router