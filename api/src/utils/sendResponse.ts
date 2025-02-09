import {
  PublicMiddlewareResponse,
  PrivateMiddlewareResponse,
  ResponseData
} from "../types/ExpressTypes";
import { responseSchema } from "../types/schemas";
import { ServerError } from "./ServerError";
import deepSearch from "./deepSearch";

// Include any fields which should never be exposed to client
const sensitiveFields = new Set(["passwordHash"]);

const sendResponse = (
  res: PublicMiddlewareResponse | PrivateMiddlewareResponse,
  responseData: ResponseData
) => {
  const validationResult = responseSchema.safeParse(responseData);
  if (!validationResult.success) {
    throw new ServerError("invalid response data format");
  }
  const { status, body, location } = responseData;
  const matchedFields = deepSearch(body, sensitiveFields);
  if (matchedFields.length) {
    throw new ServerError("sensitive information leak", {
      sensitiveFields: matchedFields
    });
  }
  if (location) res.location(location);
  res.status(status).json(body);
};

export default sendResponse;
