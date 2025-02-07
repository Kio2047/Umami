import { Types } from "mongoose";

import { mongoose } from "./index";
import { HashedNewUserCredentials, RawUserDocument } from "../types/UserTypes";
// import { RawUserDocument, RawUserDocumentWithID } from "../types/UserTypes";
import {
  FindOnePromise,
  NullableHydratedDocument,
  HydratedDocument,
  CreateOnePromise,
  UpdateOnePromise
} from "../types/MongooseCRUDTypes";

// import { UserCredentials, UserAndPostIDs } from "../types/types";
import { userSchema } from "./schemas";

const User = mongoose.model<RawUserDocument>("User", userSchema);

// TODO: either give each query function a lean boolean argument which if true makes them return a POJO, or create a lean copy of each query function

export const createNewUser = async function (
  newUserData: HashedNewUserCredentials
): CreateOnePromise<RawUserDocument> {
  const newUser = await User.create({
    ...newUserData
  });
  return newUser;
};

export const getUserByID = async <
  Fields extends keyof Omit<RawUserDocument, "_id"> = keyof Omit<
    RawUserDocument,
    "_id"
  >
>(
  id: string,
  options?: {
    fields: Fields[];
  }
): FindOnePromise<RawUserDocument, Fields> => {
  let account: NullableHydratedDocument<RawUserDocument, Fields>;
  if (options?.fields) {
    account = await User.findById(id).select<
      Pick<RawUserDocument, Fields> & { _id: Types.ObjectId }
    >(options.fields.join(" "));
  } else {
    account = await User.findById(id);
  }
  return account;
};

export const getUserByEmail = async <
  Fields extends keyof Omit<RawUserDocument, "_id"> = keyof Omit<
    RawUserDocument,
    "_id"
  >
>(
  email: string,
  options?: {
    fields: Fields[];
  }
): FindOnePromise<RawUserDocument, Fields> => {
  let account: NullableHydratedDocument<RawUserDocument, Fields>;
  if (options?.fields) {
    account = await User.findOne({ email }).select<
      Pick<RawUserDocument, Fields> & { _id: Types.ObjectId }
    >(options.fields.join(" "));
  } else {
    account = await User.findOne({ email });
  }
  return account;
};

export const getUserByUsername = async <
  Fields extends keyof Omit<RawUserDocument, "_id"> = keyof Omit<
    RawUserDocument,
    "_id"
  >
>(
  username: string,
  options?: {
    fields: Fields[];
  }
): FindOnePromise<RawUserDocument, Fields> => {
  let account: NullableHydratedDocument<RawUserDocument, Fields>;
  if (options?.fields) {
    account = await User.findOne({ username }).select<
      Pick<RawUserDocument, Fields> & { _id: Types.ObjectId }
    >(options.fields.join(" "));
  } else {
    account = await User.findOne({ username });
  }
  return account;
};

export const replaceUserprofileImageURL = async function (
  user: HydratedDocument<RawUserDocument, "profileImageURL">,
  newURL: string
) {
  user.profileImageURL = newURL;
  user.save();
};

//TODO: change from save to updateOne for atomicity?

export const appendUserFollowers = async function (
  user: HydratedDocument<RawUserDocument, "followers">,
  newFollowerId: mongoose.Types.ObjectId
): UpdateOnePromise<RawUserDocument, "followers"> {
  user.followers.push(newFollowerId);
  await user.save();
  return user;
};

export const appendUserFollowing = async function (
  user: HydratedDocument<RawUserDocument, "following">,
  newFolloweeId: mongoose.Types.ObjectId
): UpdateOnePromise<RawUserDocument, "following"> {
  user.following.push(newFolloweeId);
  await user.save();
  return user;
};

export const getUsersByQuery = async function (query: string) {
  const usernameRegex = new RegExp(`(^|_)${query}`, "i");
  const nameRegex = new RegExp(`(^| )${query}`, "i");
  const matchedUsers = await User.find({
    $or: [
      { username: { $regex: usernameRegex } },
      { name: { $regex: nameRegex } }
    ]
  }).select("_id name username profileImageURL");
  return matchedUsers;
};

// export const addFriend = async function (  ) {
//   const regex = new RegExp(`^${name}`, 'i');
//   const matchedUsers = await User.find({ name: {$regex: regex} });
//   return matchedUsers;
// };

// Cleaner way of making them required below

// var requiredAttrs = ['name', 'profileImageURL', "posts", "friends"];

// requiredAttrs.forEach((attr) => {
//   schema[attr].required! = true;
// })

// for (let attr of requiredAttrs) { schema[attr].required = true; }
