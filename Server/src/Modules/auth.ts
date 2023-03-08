// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
