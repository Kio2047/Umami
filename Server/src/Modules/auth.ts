import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RawUserDocument } from "../types/types";
import { HydratedDocument } from "mongoose";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user: HydratedDocument<RawUserDocument>) => {
  const token = jwt.sign(
    {
      sub: user.email,
      iat: Date.now()
    },
    process.env.JWT_SECRET
  );
  return token;
};
