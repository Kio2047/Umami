import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

import envVars from "../envConfig";
import { ServerError } from "../utils/ServerError";

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
  const jwtSecret = envVars.JWT_SECRET;
  const token = jwt.sign({}, jwtSecret, {
    subject: userId.toHexString()
  });
  return token;
};

// TODO: move this to middleware (would require knowing requiredID prior to any DB lookups)
export const errorIfUnauthorised = (
  requiredID: string,
  tokenPayloadUserID: string
) => {
  if (requiredID !== tokenPayloadUserID) {
    throw new ServerError("not authorised");
  }
};
