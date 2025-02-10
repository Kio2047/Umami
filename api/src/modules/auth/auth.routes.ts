import { Router } from "express";

import validatorGenerator from "../../middleware/validatorGenerator";
import { loginUser } from "./auth.controller";
import { loginUserSchemas } from "./auth.validations";

const authRouter = Router();

authRouter.post("/session", validatorGenerator(loginUserSchemas), loginUser);

// authRouter.delete("/session", authenticator, validatorGenerator(logoutUserSchemas), logoutUser);

export default authRouter;
