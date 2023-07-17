import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";

import { backupErrorHandler } from "./modules/errorHandlers";
import {
  createNewUserValidations,
  loginUserValidations,
  validateRequest
} from "./modules/validations";
import {
  createNewUser,
  loginUser
} from "./controllers/AuthenticationController";
import { authenticate } from "./modules/auth";
import protectedRouter from "./router";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.post("/user", createNewUserValidations, validateRequest, createNewUser);
app.post("/session", loginUserValidations, validateRequest, loginUser);
app.use(authenticate, protectedRouter);

app.use(backupErrorHandler);

export default app;
