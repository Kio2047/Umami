import { NextFunction } from "express";

import {
  CustomRequest as Request,
  ResponseSenderResponse as Response
} from "../types/ExpressTypes";
import logger from "../../src/utils/logger";
import deepSearch from "../../src/utils/deepSearch";
import { ResponseError } from "../../src/utils/ResponseError";
import { responseSchema } from "../../src/types/schemas";

// Include any fields which should never be exposed to client
const sensitiveFields = new Set(["passwordHash"]);

const responseSender = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { responseData } = res.locals;
    const validationResult = responseSchema.safeParse(responseData);
    if (!validationResult.success) {
      throw new ResponseError("invalid response data format");
    }
    const { status, body } = responseData;
    const matchedFields = deepSearch(body, sensitiveFields);
    if (matchedFields.length) {
      throw new ResponseError("sensitive information leak", {
        sensitiveFields: matchedFields
      });
    }
    res.status(status).json(body);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error. This one is on us :("
    });
    logger.error(
      err,
      err instanceof ResponseError ? "Handled error" : "Unhandled error"
    );
  }
};

export default responseSender;
