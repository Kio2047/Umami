// import express from "express";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { hashPassword, comparePasswords, createJWT } from "../Modules/auth";
import * as UserModel from "../Models/User";
import { RequestHandler } from "express";
import {
  ProcessedNewUserData,
  ReceivedNewUserData,
  UserCredentials
} from "../types/UserTypes";

export const createNewUser: RequestHandler = async function (
  req: Request<ParamsDictionary, any, ReceivedNewUserData>,
  res,
  next
) {
  try {
    const newUserDataPreHash = req.body;
    const passwordHash = await hashPassword(newUserDataPreHash.password);
    const { password, ...rest } = newUserDataPreHash;
    const newUserDataPostHash: ProcessedNewUserData = {
      ...rest,
      passwordHash
    };
    const newUserAccount = await UserModel.createNewUser(newUserDataPostHash);
    // TODO: Should account containing the passwordHash be returned? perhaps better to not expose that property to the client
    res.status(200).json({
      data: {
        createdAccount: {
          ...newUserAccount.toObject(),
          // Setting this property to undefined removes it from the JSON response body,
          // so the hash is not sent back to the client
          passwordHash: undefined,
          password
        },
        token: createJWT(newUserAccount)
      }
    });
  } catch (err) {
    if (err.code === 11000 && err.keyValue?.email === req.body.email) {
      err.type = "duplicate value";
      err.duplicateKey = "email";
    }
    next(err);
  }
};

export const loginUser: RequestHandler = async function (
  req: Request<ParamsDictionary, any, UserCredentials>,
  res,
  next
) {
  try {
    const { email, password } = req.body;
    const account = await UserModel.findUserByEmail(email);
    if (!account || !(await comparePasswords(password, account.passwordHash))) {
      res.status(401).json({ message: "invalid details" });
    } else {
      res.status(200).json({ token: createJWT(account) });
    }
  } catch (err) {
    next(err);
  }
};
