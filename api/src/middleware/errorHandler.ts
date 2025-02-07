import { NextFunction } from "express";

import assertUnreachable from "../utils/assertUnreachable";
import { ServerError, ServerErrorUnion } from "../utils/ServerError";
import logger from "../utils/logger";

import {
  CustomRequest as Request,
  PublicControllerResponse as Response
} from "../types/ExpressTypes";

const errorHandler = function (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let unhandledErr = false;
  if (err instanceof ServerError) {
    // Casting necessary until TS can infer constrained generic parameters after instanceof check https://github.com/microsoft/TypeScript/issues/17473
    const serverError = err as ServerErrorUnion;
    switch (serverError.message) {
      case "duplicate value":
        res.locals.responseData = {
          status: 400,
          body: {
            status: "error",
            message: "duplicate value",
            data: {
              duplicateEntity: serverError.data.duplicateKey,
              duplicateValue: serverError.data.duplicateVal
            }
          }
        };
        break;
      case "invalid jwt":
        res.locals.responseData = {
          status: 401,
          body: {
            status: "error",
            message: "Invalid bearer token"
          }
        };
        break;
      case "missing jwt":
        res.locals.responseData = {
          status: 401,
          body: {
            status: "error",
            message: "Missing authorization header"
          }
        };
        break;
      case "malformed jwt":
        res.locals.responseData = {
          status: 401,
          body: {
            status: "error",
            message: "Malformed authorization header"
          }
        };
        break;
      case "not authorised":
        res.locals.responseData = {
          status: 403,
          body: { status: "error", message: "Not authorised" }
        };
        break;
      case "invalid user id":
        res.locals.responseData = {
          status: 404,
          body: {
            status: "error",
            message: "The requested user was not found"
          }
        };
        break;
      case "invalid restaurant id":
        res.locals.responseData = {
          status: 404,
          body: {
            status: "error",
            message: "The requested restaurant was not found"
          }
        };
        break;
      case "invalid credentials":
        res.locals.responseData = {
          status: 401,
          body: { status: "error", message: "Invalid credentials" }
        };
        break;
      case "cloudinary error":
        res.locals.responseData = {
          status: 500,
          body: {
            status: "error",
            message: "Error generating Cloudinary upload signature"
          }
        };
        break;
      case "validation error":
        res.locals.responseData = {
          status: 400,
          body: {
            status: "error",
            message:
              "Request validation failed. Check the 'data' field for more information",
            data: {
              validationErrors: serverError.data.errors
            }
          }
        };
        break;
      case "invalid operation":
        res.locals.responseData = {
          status: 400,
          body: {
            status: "error",
            message: serverError.data.responseMessage
          }
        };
        break;
      default:
        unhandledErr = true;
        res.locals.responseData = {
          status: 500,
          body: {
            status: "error",
            message: "Internal server error. This one is on us :("
          }
        };
        assertUnreachable("error handler", "server error", serverError);
    }
  } else {
    unhandledErr = true;
    res.locals.responseData = {
      status: 500,
      body: {
        status: "error",
        message: "Internal server error. This one is on us :("
      }
    };
  }
  logger.error(err, unhandledErr ? "Unhandled error" : "Handled error");
  next();
};

export default errorHandler;
