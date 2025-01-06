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
          status: "error",
          message: "duplicate value",
          data: {
            duplicateEntity: serverError.data.duplicateKey,
            duplicateValue: serverError.data.duplicateVal
          }
        });
        break;
      case "invalid jwt":
        res.status(401).json({
          status: "error",
          message: "Invalid bearer token"
        });
        break;
      case "missing jwt":
        res.status(401).json({
          status: "error",
          message: "Missing authorization header"
        });
        break;
      case "malformed jwt":
        res.status(401).json({
          status: "error",
          message: "Malformed authorization header"
        });
        break;
      case "not authorised":
        res.status(403).json({ status: "error", message: "Not authorised" });
        break;
      case "invalid user id":
        res.status(404).json({
          status: "error",
          message: "The requested user was not found"
        });
        break;
      case "invalid restaurant id":
        res.status(404).json({
          status: "error",
          message: "The requested restaurant was not found"
        });
        break;
      case "invalid credentials":
        res
          .status(401)
          .json({ status: "error", message: "Invalid credentials" });
        break;
      case "cloudinary error":
        res.status(500).json({
          status: "error",
          message: "Error generating Cloudinary upload signature"
        });
        break;
      case "validation error":
        res.status(400).json({
          status: "error",
          message:
            "Request validation failed. Check the 'details' field for more information",
          details: serverError.data.errors
        });
        break;
      case "invalid operation":
        res.status(400).json({
          status: "error",
          message: serverError.data.responseMessage
        });
        break;
      default:
        unhandledErr = true;
        res.status(500).json({
          status: "error",
          message: "Internal server error. This one is on us :("
        });
        assertUnreachable("error handler", "server error", serverError);
    }
  } else {
    unhandledErr = true;
    res.status(500).json({
      status: "error",
      message: "Internal server error. This one is on us :("
    });
  }

  logger.error(err, unhandledErr ? "Unhandled error" : "Handled error");
};

export default errorHandler;
