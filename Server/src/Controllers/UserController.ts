import { Request, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { errorIfUnauthorised } from "../Modules/auth";
import * as UserModel from "../Models/User";

export const createFollowConnection: RequestHandler = async (
  req: Request<ParamsDictionary, any, { userToFollowID: string }>,
  res,
  next
) => {
  try {
    const [paramsUserID, tokenPayloadUserID] = [
      req.params.id,
      res.locals.tokenPayload.sub
    ];
    errorIfUnauthorised(paramsUserID, tokenPayloadUserID);

    const userToFollowID = req.body.userToFollowID;
    const [currentUser, userToFollow] = await Promise.all([
      UserModel.findUserByID(paramsUserID),
      UserModel.findUserByID(userToFollowID)
    ]);

    if (!currentUser) {
      throw new Error("No matching user document for requesting user's id", {
        cause: "user id not valid"
      });
    } else if (!userToFollow) {
      throw new Error("No matching user document for user-to-follow id", {
        cause: "user-to-follow id not valid"
      });
    }

    // const [updatedCurrentUser, updatedUserToFollow] =
    await UserModel.updateFollowingBidirectionally(currentUser, userToFollow);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
