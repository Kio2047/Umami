import { NextFunction } from "express";

import assertUnreachable from "../utils/assertUnreachable";
import { ServerError, ServerErrorUnion } from "../utils/ServerError";
import logger from "../utils/logger";

import {
  CustomRequest as Request,
  PublicMiddlewareResponse,
  PrivateMiddlewareResponse
} from "../types/ExpressTypes";
import sendResponse from "../utils/sendResponse";

const errorHandler = function (
  err: unknown,
  req: Request,
  res: PublicMiddlewareResponse | PrivateMiddlewareResponse,
  next: NextFunction
) {
  let unhandledErr = false;
  if (err instanceof ServerError) {
    // Casting necessary until TS can infer constrained generic parameters after instanceof check https://github.com/microsoft/TypeScript/issues/17473
    const serverError = err as ServerErrorUnion;
    switch (serverError.message) {
      case "not found":
        sendResponse(res, {
          status: 404,
          body: {
            status: "error",
            message: "The requested resource was not found"
          }
        });
        break;
      case "duplicate value":
        sendResponse(res, {
          status: 400,
          body: {
            status: "error",
            message:
              "Duplicate value. Check the 'data' field for more information",
            data: {
              duplicateEntity: serverError.data.duplicateKey,
              duplicateValue: serverError.data.duplicateVal
            }
          }
        });
        break;
      case "invalid jwt":
        sendResponse(res, {
          status: 401,
          body: {
            status: "error",
            message: "Invalid bearer token"
          }
        });
        break;
      case "missing jwt":
        sendResponse(res, {
          status: 401,
          body: {
            status: "error",
            message: "Missing authorization header"
          }
        });
        break;
      case "malformed jwt":
        sendResponse(res, {
          status: 401,
          body: {
            status: "error",
            message: "Malformed authorization header"
          }
        });
        break;
      case "not authorised":
        sendResponse(res, {
          status: 403,
          body: { status: "error", message: "Not authorised" }
        });
        break;
      case "invalid user id":
        sendResponse(res, {
          status: 404,
          body: {
            status: "error",
            message: "The requested user was not found"
          }
        });
        break;
      case "invalid restaurant id":
        sendResponse(res, {
          status: 404,
          body: {
            status: "error",
            message: "The requested restaurant was not found"
          }
        });
        break;
      case "invalid credentials":
        sendResponse(res, {
          status: 401,
          body: { status: "error", message: "Invalid credentials" }
        });
        break;
      case "validation error":
        sendResponse(res, {
          status: 400,
          body: {
            status: "error",
            message:
              "Request validation failed. Check the 'data' field for more information",
            data: {
              validationErrors: serverError.data.errors
            }
          }
        });
        break;
      case "invalid operation":
        sendResponse(res, {
          status: 400,
          body: {
            status: "error",
            message:
              "Invalid operation attempted. Check the 'data' field for more information",
            data: {
              operation: serverError.data.operation
            }
          }
        });
        break;
      case "cloudinary error":
        sendResponse(res, {
          status: 500,
          body: {
            status: "error",
            message: "Error generating Cloudinary upload signature"
          }
        });
        break;
      case "sensitive information leak":
      case "invalid response data format":
        sendResponse(res, {
          status: 500,
          body: {
            status: "error",
            message: "Internal server error. This one is on us :("
          }
        });
        break;
      default:
        assertUnreachable("error handler", "server error", serverError);
    }
  } else {
    unhandledErr = true;
    sendResponse(res, {
      status: 500,
      body: {
        status: "error",
        message: "Internal server error. This one is on us :("
      }
    });
  }
  logger.error(err, unhandledErr ? "Unhandled error" : "Handled error");
};

export default errorHandler;
