import { Request, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { errorIfUnauthorised } from "../Modules/auth";
import * as UserModel from "../Models/User";
import { NonNullFindOneResult } from "../types/MongooseCRUDTypes";
import { RawUserDocument } from "../types/UserTypes";

// export const getUserInfo: RequestHandler = async (req, res, next) => {
//   try {
//     const [paramsUserID, userID] = [req.params.id, res.locals.tokenPayload.sub];
//     errorIfUnauthorised(paramsUserID, userID);
//     const user = await UserModel.getUserByID(userID);
//     if (!user) {
//       throw new Error(`No matching user document for the provided id`, {
//         cause: "invalid user id"
//       });
//     }
//     const { _id, passwordHash, ...requiredInfo } = user.toObject();
//     res.status(200).json({ data: { userInfo: requiredInfo } });
//   } catch (err) {
//     next(err);
//   }
// };

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
    const user = await UserModel.getUserByID(userID);
    if (!user) {
      throw new Error(
        `No matching user document for the provided id (requesting user)`,
        {
          cause: "invalid user id"
        }
      );
    }

    switch (true) {
      case path === "/following" && operation === "add":
        await createFollowConnection(userID, value);
        break;
      case path === "/profileImageURL" && operation === "replace":
        UserModel.replaceUserprofileImageURL(user, value);
        break;
      default:
        res
          .status(400)
          .json({ error: { message: "PATCH action not supported" } });
        return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const createFollowConnection = async (
  user: NonNullFindOneResult<RawUserDocument>,
  userToFollowID: string
): Promise<void> => {
  const userToFollow = await UserModel.getUserByID(userToFollowID, {
    fields: ["followers"]
  });
  if (!userToFollow) {
    throw new Error(
      `No matching user document for the provided id (user to follow)`,
      {
        cause: "invalid user id"
      }
    );
  }
  // TODO: prevent users from following self:
  // if (follower._id === followed._id) throw new Error()
  const [updatedFollower, updatedFollowed] = await Promise.all([
    UserModel.appendUserFollowing(user, userToFollow._id),
    UserModel.appendUserFollowers(userToFollow, user._id)
  ]);
};

export const getUserByID: RequestHandler = async (
  req: Request<ParamsDictionary, any, {}, { fields?: string }>,
  res,
  next
) => {
  try {
    const paramsUserID = req.params.id;
    const requestedFields = req.query.fields?.split(",");
    if (!requestedFields || requestedFields.includes("email")) {
      const currentUserID = res.locals.tokenPayload.sub;
      errorIfUnauthorised(paramsUserID, currentUserID);
    }
    const user = await UserModel.getUserByID(paramsUserID, {
      fields: ["name"]
    });
    if (!user) res.json("no user");
    else res.json({ name: user });
  } catch (err) {}
};

export const getUsersByQuery: RequestHandler = async (
  req: Request<ParamsDictionary, any, {}, { q: string }>,
  res,
  next
) => {
  try {
    const query = req.query.q;
    const matchedUsers = await UserModel.getUsersByQuery(query);
    res.status(200).json({
      data: {
        matchedUsers
      }
    });
  } catch (err) {
    next(err);
  }
};
