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
    }
    sendResponse(res, {
      status: 200,
      body: {
        data: {
          token: createJWT(user._id)
        },
        status: "success",
        message: "Successfully authenticated user"
      }
    });
  } catch (err) {
    next(err);
  }
};
