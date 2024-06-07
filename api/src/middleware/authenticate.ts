import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { ServerError } from "../utils/ServerError";
import { isValidToken } from "../Modules/validations";

export const authenticate: RequestHandler = (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return next(new ServerError("no jwt secret in process environment"));
  }

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

  if (!isValidToken(decryptedToken)) {
    return next(
      new ServerError("invalid jwt", {
        additionalInfo: `token payload in invalid format: ${JSON.stringify(
          decryptedToken
        )}`
      })
    );
  }

  res.locals.tokenPayload = decryptedToken;

  next();
};
