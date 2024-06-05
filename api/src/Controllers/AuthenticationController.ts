import { NextFunction } from "express";
import { MongoServerError } from "mongodb";

import { TypedRequest, TypedResponse } from "../types/ExpressTypes";
import { hashPassword, comparePasswords, createJWT } from "../Modules/auth";
import * as UserModel from "../Models/User";
import {
  AuthenticationResponse,
  HashedNewUserCredentials,
  NewUserCredentials,
  UserCredentials
} from "../types/UserTypes";
import { ServerError } from "../../src/utils/ServerError";

export const createNewUser = async function (
  req: TypedRequest<NewUserCredentials>,
  res: TypedResponse<{ data: AuthenticationResponse }>,
  next: NextFunction
): Promise<void> {
  try {
    const { password, ...rest } = req.body;
    const passwordHash = await hashPassword(password);
    const hashedUserCredentials: HashedNewUserCredentials = {
      ...rest,
      passwordHash
    };
    const newUser = await UserModel.createNewUser(hashedUserCredentials);
    res.location(`/users/${newUser._id}`);
    res.status(201).json({
      data: {
        _id: newUser._id.toString(),
        token: createJWT(newUser._id)
      }
    });
  } catch (err) {
    let serverError: unknown = err;
    if (!(err instanceof ServerError)) {
      if (err instanceof MongoServerError && err.code === 11000) {
        serverError = new ServerError("duplicate value", {
          duplicateKey: Object.keys(err.keyPattern)[0],
          duplicateVal: ""
        });
      }
    }
    next(serverError);
  }
};

export const loginUser = async function (
  req: TypedRequest<UserCredentials>,
  res: TypedResponse<{ data: AuthenticationResponse }>,
  next: NextFunction
) {
  try {
    const { usernameOrEmail, password } = req.body;
    let user: Awaited<
      ReturnType<typeof UserModel.getUserByEmail<"passwordHash">>
    >;
    if (usernameOrEmail.includes("@")) {
      user = await UserModel.getUserByEmail(usernameOrEmail, {
        fields: ["passwordHash"]
      });
    } else {
      user = await UserModel.getUserByUsername(usernameOrEmail, {
        fields: ["passwordHash"]
      });
    }
    if (!user || !(await comparePasswords(password, user.passwordHash))) {
      throw new ServerError("invalid credentials");
    } else {
      res.status(200).json({
        data: {
          _id: user._id.toString(),
          token: createJWT(user._id)
        }
      });
    }
  } catch (err) {
    let serverError: unknown = err;
    if (!(err instanceof ServerError)) {
    }
    next(serverError);
  }
};
