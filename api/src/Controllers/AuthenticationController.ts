import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { hashPassword, comparePasswords, createJWT } from "../modules/auth";
import * as UserModel from "../models/User";
import { RequestHandler } from "express";
import {
  ProcessedNewUserData,
  RawUserDocument,
  ReceivedNewUserData,
  UserCredentials
} from "../types/UserTypes";
// import { FindOneResult } from "../types/MongooseCRUDTypes";

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
      passwordHash,
      profileImageURL:
        "https://res.cloudinary.com/di3penpbh/image/upload/v1678286761/user_profile_pictures/1200px-Default_pfp.svg_ewo17q.png"
    };
    const newUserAccount = await UserModel.createNewUser(newUserDataPostHash);
    res.status(200).json({
      data: {
        createdAccount: {
          ...newUserAccount.toObject(),
          // Setting property to undefined removes it from the JSON response body so the hash isn't sent back to the client
          passwordHash: undefined,
          password
        },
        token: createJWT(newUserAccount)
      }
    });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      err.cause = "duplicate value";
      err.duplicateKey = Object.keys(err.keyPattern)[0];
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
    const { usernameOrEmail, password } = req.body;
    let user: Awaited<ReturnType<typeof UserModel.getUserByEmail>>;
    if (usernameOrEmail.includes("@")) {
      user = await UserModel.getUserByEmail(usernameOrEmail);
    } else {
      user = await UserModel.getUserByUsername(usernameOrEmail);
    }
    if (!user || !(await comparePasswords(password, user.passwordHash))) {
      res.status(401).json({ error: { message: "invalid details" } });
    } else {
      res.status(200).json({
        data: {
          userID: user._id,
          token: createJWT(user)
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
