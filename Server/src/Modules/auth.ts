import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RawUserDocument } from "../types/UserTypes";
import { HydratedDocument } from "mongoose";
import { RequestHandler } from "express";

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = (
  password: string,
  hash: string
): Promise<Boolean> => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user: HydratedDocument<RawUserDocument>): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET value exists in process environment", {
      cause: "no jwt secret"
    });
  }
  const token = jwt.sign(
    {
      sub: user._id,
      iat: Date.now()
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const authenticate: RequestHandler = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET value exists in process environment", {
      cause: "no jwt secret"
    });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.split(" ")[1]) {
    res.status(401);
    res.json({ error: { message: "not authorised" } });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.tokenPayload = tokenPayload;
    next();
  } catch (err) {
    err.cause = "invalid jwt";
    next(err);
  }
};

// TODO: move this to middleware (would require knowing requiredID prior to any DB lookups)
export const errorIfUnauthorised = (
  requiredID: string,
  tokenPayloadUserID: string
) => {
  if (requiredID !== tokenPayloadUserID) {
    throw new Error("User not authorised to perform this action", {
      cause: "not authorised"
    });
  }
};
