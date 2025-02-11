import { Router } from "express";

import { registerUser } from "./user.controller";
import validatorGenerator from "../../middleware/validatorGenerator";
import { registerUserSchema } from "./user.validations";

const userRouter = Router();

userRouter.post("/user", validatorGenerator(registerUserSchema), registerUser);

// protectedRouter.patch(
//   "/user/me",
//   updateUserValidations,
//   requestValidator,
//   UserController.updateUser
// );

export default userRouter;
