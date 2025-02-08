import { Router } from "express";

import { registerUserSchemas, loginUserSchemas } from "../Modules/validations";
import {
  loginUser,
  registerUser
} from "../Controllers/AuthenticationController";
import validatorGenerator from "../middleware/validatorGenerator";

const authRouter = Router();

authRouter.post("/user", validatorGenerator(registerUserSchemas), registerUser);

authRouter.post("/session", validatorGenerator(loginUserSchemas), loginUser);

export default authRouter;
