import { NextFunction } from "express";
import { MongoServerError } from "mongodb";
import { z } from "zod";

import {
  CustomRequest as Request,
  PublicControllerResponse as Response
} from "../types/ExpressTypes";
import { HashedNewUserCredentials } from "../types/UserTypes";
import { hashPassword, comparePasswords, createJWT } from "../Modules/auth";
import * as UserModel from "../Models/User";
import { ServerError } from "../utils/ServerError";
import { loginUserSchemas, registerUserSchemas } from "src/Modules/validations";

export const registerUser = async function (
  req: Request<z.infer<typeof registerUserSchemas.body>>,
  res: Response,
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
    res.locals.responseData = {
      status: 201,
      location: `/users/${newUser._id}`,
      body: {
        data: {
          token: createJWT(newUser._id)
        },
        status: "success",
        message: "New account successfully created"
      }
    };
    next();
  } catch (err) {
    if (!(err instanceof ServerError)) {
      if (err instanceof MongoServerError && err.code === 11000) {
        next(
          new ServerError("duplicate value", {
            duplicateKey: Object.keys(err.keyPattern)[0],
            duplicateVal: Object.values<string>(err.keyValue)[0],
            cause: err
          })
        );
        return;
      }
    }
    next(err);
  }
};

export const loginUser = async function (
  req: Request<z.infer<typeof loginUserSchemas.body>>,
  res: Response,
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
      res.locals.responseData = {
        status: 200,
        body: {
          data: {
            token: createJWT(user._id)
          },
          status: "success",
          message: "Successfully authenticated user"
        }
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};
