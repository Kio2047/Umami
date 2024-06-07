import jwt, { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { RequestHandler } from "express";
import { ServerError } from "../../src/utils/ServerError";

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (userId: Types.ObjectId): string => {
  if (!process.env.JWT_SECRET) {
    throw new ServerError("no jwt secret in process environment");
  }
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    subject: userId.toString()
  });
  return token;
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
