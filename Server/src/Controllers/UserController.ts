import { Request, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { errorIfUnauthorised } from "../Modules/auth";
import * as UserModel from "../Models/User";

export const getUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const [paramsUserID, userID] = [req.params.id, res.locals.tokenPayload.sub];
    errorIfUnauthorised(paramsUserID, userID);
    const user = await UserModel.findUserByID(userID);
    if (!user) {
      throw new Error(`No matching user document for the provided id`, {
        cause: "invalid user id"
      });
    }
    const { _id, __v, passwordHash, ...requiredInfo } = user;
    res.status(200).json(requiredInfo);
  } catch (err) {
    next(err);
  }
};

export const updateUser: RequestHandler = async (
  req: Request<
    ParamsDictionary,
    any,
    { operation: "add" | "remove" | "replace"; path: string; value: any }
  >,
  res,
  next
) => {
  try {
    const [paramsUserID, userID] = [req.params.id, res.locals.tokenPayload.sub];
    errorIfUnauthorised(paramsUserID, userID);

    const { path, operation, value } = req.body;
    const user = await UserModel.findUserByID(userID);
    if (!user) {
      throw new Error(`No matching user document for the provided id`, {
        cause: "invalid user id"
      });
    }

    switch (true) {
      case path === "/following" && operation === "add":
        await createFollowConnection(userID, value);
        break;
      case path === "/profileImageURL" && operation === "replace":
        UserModel.replaceUserprofileImageURL(user, value);
        break;
      default:
        res.status(400).json({ message: "PATCH action not supported" });
        return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const createFollowConnection = async (
  userID: string,
  userToFollowID: string
) => {
  const [currentUser, userToFollow] = await Promise.all([
    UserModel.findUserByID(userID),
    UserModel.findUserByID(userToFollowID)
  ]);

  if (!currentUser || !userToFollow) {
    const bothInvalid =
      [currentUser, userToFollow].filter((user) => !user).length === 2;
    throw new Error(
      `No matching user document for the provided id${bothInvalid ? "" : "s"}`,
      {
        cause: "invalid user id"
      }
    );
  }

  await UserModel.updateFollowingBidirectionally(currentUser, userToFollow);
};
