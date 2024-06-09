import { ErrorRequestHandler } from "express";

import assertUnreachable from "../utils/assertUnreachable";
import { ServerError, ServerErrorUnion } from "../utils/ServerError";
import logger from "../utils/logger";

const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  let unhandledErr = false;
  if (err instanceof ServerError) {
    // Casting necessary until TS can infer constrained generic parameters after instanceof check https://github.com/microsoft/TypeScript/issues/17473
    const serverError = err as ServerErrorUnion;
    switch (serverError.message) {
      case "duplicate value":
        res.status(400).json({
          error: {
            message: "duplicate value",
            data: {
              duplicateEntity: serverError.data.duplicateKey,
              duplicateValue: serverError.data.duplicateVal
            }
          }
        });
        break;
      case "invalid jwt":
        res.status(401).json({ error: { message: "invalid bearer token" } });
        break;
      case "missing jwt":
        res
          .status(401)
          .json({ error: { message: "missing authorization header" } });
        break;
      case "malformed jwt":
        res
          .status(401)
          .json({ error: { message: "malformed authorization header" } });
        break;
      case "not authorised":
        res.status(403).json({ error: { message: "not authorised" } });
        break;
      case "invalid user id":
        res
          .status(404)
          .json({ error: { message: "invalid user id provided" } });
        break;
      case "invalid restaurant id":
        res
          .status(404)
          .json({ error: { message: "invalid restaurant id provided" } });
        break;
      case "invalid credentials":
        res.status(401).json({ error: { message: "invalid credentials" } });
        break;
      default:
        unhandledErr = true;
        res.status(500).json({
          error: { message: "internal server error. that one's on us :(" }
        });
        assertUnreachable("error handler", "server error", serverError);
    }
  } else {
    unhandledErr = true;
    res.status(500).json({
      error: { message: "internal server error. that one's on us :(" }
    });
  }

  const errorData = Object.keys(err?.data ?? {}).length
    ? `Additional information: ${JSON.stringify(err.data)}`
    : "";

  unhandledErr
    ? logger.fatal("Unhandled error", err, errorData)
    : logger.error("Handled error", err, errorData);
};

export default errorHandler;
