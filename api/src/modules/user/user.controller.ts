import { NextFunction } from "express";
import { z } from "zod";
import { MongoServerError } from "mongodb";

import {
  CustomRequest as Request,
  PrivateMiddlewareResponse as Response
} from "../../types/ExpressTypes";
import { ServerError } from "../../utils/ServerError";
import sendResponse from "../../utils/sendResponse";
import { createJWT, hashPassword } from "../../utils/auth";
import * as UserModel from "./user.model";
import { registerUserSchema, updateUserSchemas } from "./user.validations";
import assertUnreachable from "../../utils/assertUnreachable";
import { UpdateWriteOpResult } from "mongoose";

export const registerUser = async function (
  req: Request<z.infer<typeof registerUserSchema.body>>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { password, ...rest } = req.body;
    const passwordHash = await hashPassword(password);
    const hashedUserCredentials: Omit<
      z.infer<typeof registerUserSchema.body>,
      "password"
    > & {
      passwordHash: string;
    } = {
      ...rest,
      passwordHash
    };
    const { _id, profileImageURL, name, username, metadata } =
      await UserModel.createNewUser(hashedUserCredentials);

    sendResponse(res, {
      status: 201,
      location: `/users/${_id}`,
      body: {
        data: {
          token: createJWT(_id),
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
        message: "New account successfully created"
      }
    });
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

export const updateUser = async (
  req: Request<z.infer<typeof updateUserSchemas.body>, never, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const [paramsUserID, userID] = [req.params.id, res.locals.tokenPayload.sub];
    if (paramsUserID !== userID) {
      throw new ServerError("not authorised");
    }
    const { op, path, value } = req.body;
    let result: UpdateWriteOpResult;
    if (op === "replace") {
      switch (path) {
        case "/password":
          result = await UserModel.replaceUserField(
            paramsUserID,
            "passwordHash",
            await hashPassword(value)
          );
          break;
        case "/profileImage":
          result = await UserModel.replaceUserField(
            paramsUserID,
            "profileImageURL",
            value
          );
          break;
        case "/email":
          result = await UserModel.replaceUserField(
            paramsUserID,
            "email",
            value
          );
          break;
        case "/name":
          result = await UserModel.replaceUserField(
            paramsUserID,
            "name",
            value
          );
          break;
        case "/username":
          result = await UserModel.replaceUserField(
            paramsUserID,
            "username",
            value
          );
          break;
      }
      if (result.matchedCount === 0) throw new ServerError("invalid user id");
    } else if (op === "add") {
      //
    } else {
      assertUnreachable("updateUser", "operation", op);
    }

    sendResponse(res, {
      status: 204,
      location: `/users/${paramsUserID}`,
      body: {
        status: "success",
        message: "User successfully updated profile"
      }
    });
  } catch (err) {
    next(err);
  }
};

// const createFollowConnection = async (
//   follower: HydratedDocument<RawUserDocument>,
//   followeeId: string
// ): Promise<void> => {
//   if (follower._id.toHexString() === followeeId) {
//     throw new ServerError("invalid operation", {
//       operation: "User attempted to follow themselves",
//       additionalInfo: `User id: ${followeeId}`
//     });
//   }

//   const followee = await UserModel.getUserByID(followeeId, {
//     fields: ["followers"]
//   });
//   if (!followee) {
//     throw new ServerError("invalid user id");
//   }

//   await Promise.all([
//     UserModel.appendUserFollowing(follower, followee._id),
//     UserModel.appendUserFollowers(followee, follower._id)
//   ]);
// };

// export const getUserByID: RequestHandler = async (
//   req: Request<ParamsDictionary, any, {}, { fields?: string }>,
//   res,
//   next
// ) => {
//   try {
//     const paramsUserID = req.params.id;
//     const requestedFields = req.query.fields?.split(",");
//     if (!requestedFields || requestedFields.includes("email")) {
//       const currentUserID = res.locals.tokenPayload.sub;
//       errorIfUnauthorised(paramsUserID, currentUserID);
//     }
//     const user = await UserModel.getUserByID(paramsUserID, {
//       fields: ["name"]
//     });
//     if (!user) res.json("no user");
//     else res.json({ name: user });
//   } catch (err) {}
// };

// export const getUsersByQuery: RequestHandler = async (
//   req: Request<ParamsDictionary, any, {}, { q: string }>,
//   res,
//   next
// ) => {
//   try {
//     const query = req.query.q;
//     const matchedUsers = await UserModel.getUsersByQuery(query);
//     res.status(200).json({
//       data: {
//         matchedUsers
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };
