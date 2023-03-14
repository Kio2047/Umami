import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RawUserDocument } from "../types/UserTypes";
import { HydratedDocument } from "mongoose";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user: HydratedDocument<RawUserDocument>) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET value exists in process environment", {
      cause: "no jwt secret"
    });
  }
  const token = jwt.sign(
    {
      sub: user.email,
      iat: Date.now()
    },
    process.env.JWT_SECRET
  );
  return token;
};

// next commit is a fix, fix seeder and create new post endpoint

// next, add validations for create new post
