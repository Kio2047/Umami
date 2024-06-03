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
      case "not authorised":
        res.status(403).json({ error: { message: "not authorised" } });
        break;
      case "invalid user id":
        res
          .status(404)
          .json({ error: { message: "invalid user id provided" } });
        break;
      case "no cloudinary API secret":
        res.status(500).json({
          error: { message: "internal server error. that one's on us :(" }
        });
        break;
      case "no jwt secret":
        res.status(500).json({
          error: { message: "internal server error. that one's on us :(" }
        });
        break;
      case "invalid credentials":
        res.status(401).json({ error: { message: "invalid credentials" } });
        break;
      case "unknown":
        unhandledErr = true;
        res.status(500).json({
          error: { message: "internal server error. that one's on us :(" }
        });
        break;
      default:
        assertUnreachable("error handler", "server error", serverError);
    }
  } else {
    unhandledErr = true;
    res.status(500).json({
      error: { message: "internal server error. that one's on us :(" }
    });
  }
  logger.error(
    `${unhandledErr ? "unhandled error:" : ""}`,
    err,
    Object.keys(err.data).length
      ? `Additional information: ${JSON.stringify(err.data)}`
      : ""
  );
};

export default errorHandler;
