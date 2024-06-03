import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import requestLogger from "pino-http";

import errorHandler from "./middleware/errorHandler";
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
import logger from "./utils/logger";

const app = express();

app.use(
  requestLogger({
    logger
  })
);
app.use(cors());
app.use(express.json());

app.post("/user", createNewUserValidations, validateRequest, createNewUser);
app.post("/session", loginUserValidations, validateRequest, loginUser);
app.use(authenticate, protectedRouter);

app.use(errorHandler);

export default app;
