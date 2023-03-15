import express, { ErrorRequestHandler } from "express";
// import cors from "cors";
import morgan from "morgan";

import { backupErrorHandler } from "./Modules/errorHandlers";
import {
  createNewUserValidations,
  loginUserValidations,
  validateRequest
} from "./Modules/validations";
import {
  createNewUser,
  loginUser
} from "./Controllers/AuthenticationController";
import { authenticate } from "./Modules/auth";
import protectedRouter from "./router";

const app = express();
app.use(morgan("dev"));
// app.use(cors());
app.use(express.json());

app.post("/user", createNewUserValidations, validateRequest, createNewUser);
app.post("/session", loginUserValidations, validateRequest, loginUser);
app.use(authenticate, protectedRouter);

app.use(backupErrorHandler);

export default app;
