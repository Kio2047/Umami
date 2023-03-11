import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NewUserDetailsPostHash } from "../types";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user: NewUserDetailsPostHash) => {
  const token = jwt.sign(
    {
      sub: user.email,
      iat: Date.now()
    },
    process.env.JWT_SECRET
  );
  return token;
};
