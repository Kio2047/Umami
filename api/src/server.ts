import express from "express";
import cors from "cors";
import requestLogger from "pino-http";

import errorHandler from "./middleware/errorHandler";
import {
  createNewUserValidations,
  loginUserValidations,
  validateRequest
} from "./Modules/validations";
import {
  registerUser,
  loginUser
} from "./Controllers/AuthenticationController";
import { authenticate } from "./middleware/authenticate";
import protectedRouter from "./router";
import logger from "./utils/logger";

const app = express();

app.use(
  requestLogger({
    logger,
    customLogLevel: function (req, res, err) {
      if (res.statusCode >= 500 || err) {
        return "error";
      }
      if (res.statusCode >= 400) {
        return "warn";
      }
      return "info";
    },
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url
      }),
      res: (res) => ({
        statusCode: res.statusCode
      })
    }
  })
);

app.use(cors());
app.use(express.json());

app.post("/user", createNewUserValidations, validateRequest, registerUser);
app.post("/session", loginUserValidations, validateRequest, loginUser);

app.use(authenticate, protectedRouter);

app.use(errorHandler);

export default app;
