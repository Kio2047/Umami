import { Router } from "express";

import { registerUser } from "./user.controller";
import validatorGenerator from "../../middleware/validatorGenerator";
import { registerUserSchemas } from "./user.validations";

const userRouter = Router();

userRouter.post("/user", validatorGenerator(registerUserSchemas), registerUser);

// protectedRouter.patch(
//   "/user/me",
//   updateUserValidations,
//   requestValidator,
//   UserController.updateUser
// );

export default userRouter;
