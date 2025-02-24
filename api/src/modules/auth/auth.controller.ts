import { NextFunction } from "express";
import { z } from "zod";

import {
  CustomRequest as Request,
  PublicMiddlewareResponse as Response
} from "../../types/ExpressTypes";
import { comparePasswords, createJWT } from "../../utils/auth";
import * as UserModel from "../user/user.model";
import { ServerError } from "../../utils/ServerError";
import { loginUserSchemas } from "./auth.validations";
import sendResponse from "../../utils/sendResponse";
import { NullableLeanDocument } from "src/types/MongooseTypes";
import { RawUserDocument } from "../user/user.types";

export const loginUser = async function (
  req: Request<z.infer<typeof loginUserSchemas.body>>,
  res: Response,
  next: NextFunction
) {
  try {
    const { usernameOrEmail, password } = req.body;
    let user: NullableLeanDocument<
      RawUserDocument,
      "passwordHash" | "profileImageURL" | "name" | "username" | "metadata"
    >;

    if (usernameOrEmail.includes("@")) {
      user = await UserModel.getUserByEmail(usernameOrEmail, {
        fields: [
          "passwordHash",
          "profileImageURL",
          "name",
          "username",
          "metadata"
        ]
      });
    } else {
      user = await UserModel.getUserByUsername(usernameOrEmail, {
        fields: [
          "passwordHash",
          "profileImageURL",
          "name",
          "username",
          "metadata"
        ]
      });
    }
    if (!user || !(await comparePasswords(password, user.passwordHash))) {
      throw new ServerError("invalid credentials");
    }
    const { profileImageURL, name, username, metadata } = user;
    sendResponse(res, {
      status: 200,
      body: {
        data: {
          token: createJWT(user._id),
          user: {
            data: {
              profileImageURL,
              name,
              username
            },
            metadata
          }
        },
        status: "success",
        message: "Successfully authenticated user"
      }
    });
  } catch (err) {
    next(err);
  }
};
