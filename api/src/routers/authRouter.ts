import { Router } from "express";

import {
  createNewUserValidations,
  loginUserValidations,
  validateRequest
} from "../Modules/validations";
import {
  loginUser,
  registerUser
} from "../Controllers/AuthenticationController";

const authRouter = Router();

authRouter.post(
  "/user",
  createNewUserValidations,
  validateRequest,
  registerUser
);

authRouter.post("/session", loginUserValidations, validateRequest, loginUser);

export default authRouter;
