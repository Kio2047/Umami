import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  CustomRequest as Request,
  PrivateMiddlewareResponse as Response
} from "../types/ExpressTypes";
import { ServerError } from "../utils/ServerError";
import envVars from "../envConfig";
import { tokenPayloadSchema } from "../types/schemas";

const publicRoutes = new Set(["POST:/user", "POST:/session"]);

const authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestKey = `${req.method}:${req.path}`;
  if (publicRoutes.has(requestKey)) return next();

  const jwtSecret = envVars.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return next(
      new ServerError("missing jwt", {
        additionalInfo: "authorization header missing"
      })
    );

  const token = authHeader.split(" ")[1];
  if (!token)
    return next(
      new ServerError("malformed jwt", {
        additionalInfo:
          "authorization parameters missing from authorization header"
      })
    );

  let decryptedToken: string | JwtPayload;
  try {
    decryptedToken = jwt.verify(token, jwtSecret);
  } catch (err) {
    return next(
      new ServerError("invalid jwt", {
        cause: err,
        additionalInfo: "jwt verification failed"
      })
    );
  }

  const parseResult = tokenPayloadSchema.safeParse(decryptedToken);
  if (!parseResult.success)
    return next(
      new ServerError("invalid jwt", {
        additionalInfo: `token payload in invalid format: ${JSON.stringify(
          decryptedToken
        )}`
      })
    );

  res.locals.tokenPayload = parseResult.data;

  next();
};

export default authenticator;
