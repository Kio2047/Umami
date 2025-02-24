import { Types } from "mongoose";
import { z } from "zod";

import {
  NullableLeanDocument,
  LeanFindOnePromise
} from "../../types/MongooseTypes";
import { mongoose } from "../../db/index";
import { RawUserDocument } from "./user.types";
import { userSchema } from "../../db/schemas";
import { registerUserSchema } from "./user.validations";

const User = mongoose.model<RawUserDocument>("User", userSchema);

export const createNewUser = async function (
  newUserData: Omit<z.infer<typeof registerUserSchema.body>, "password"> & {
    passwordHash: string;
  }
): Promise<RawUserDocument> {
  const newUser = await User.create({
    ...newUserData
  });
  return newUser.toObject();
};

export const replaceUserField = async function (
  userId: string,
  field: keyof RawUserDocument,
  newVal: string
) {
  const result = await User.updateOne(
    { _id: userId },
    { $set: { [field]: newVal } }
  );
  return result;
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
): LeanFindOnePromise<RawUserDocument, Fields> => {
  let user: NullableLeanDocument<RawUserDocument, Fields>;
  if (options?.fields) {
    user = await User.findById(id)
      .lean()
      .select<
        Pick<RawUserDocument, Fields> & { _id: Types.ObjectId }
      >(options.fields.join(" "));
  } else {
    user = await User.findById(id).lean();
  }
  return user;
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
): LeanFindOnePromise<RawUserDocument, Fields> => {
  let user: NullableLeanDocument<RawUserDocument, Fields>;
  if (options?.fields) {
    user = await User.findOne({ email })
      .lean()
      .select<
        Pick<RawUserDocument, Fields> & { _id: Types.ObjectId }
      >(options.fields.join(" "));
  } else {
    user = await User.findOne({ email }).lean();
  }
  return user;
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
): LeanFindOnePromise<RawUserDocument, Fields> => {
  let user: NullableLeanDocument<RawUserDocument, Fields>;
  if (options?.fields) {
    user = await User.findOne({ username })
      .lean()
      .select<
        Pick<RawUserDocument, Fields> & { _id: Types.ObjectId }
      >(options.fields.join(" "));
  } else {
    user = await User.findOne({ username }).lean();
  }
  return user;
};

//TODO: change from save to updateOne for atomicity?

// export const appendUserFollowers = async function (
//   user: HydratedDocument<RawUserDocument, "followers">,
//   newFollowerId: mongoose.Types.ObjectId
// ): UpdateOnePromise<RawUserDocument, "followers"> {
//   user.followers.push(newFollowerId);
//   await user.save();
//   return user;
// };

// export const appendUserFollowing = async function (
//   user: HydratedDocument<RawUserDocument, "following">,
//   newFolloweeId: mongoose.Types.ObjectId
// ): UpdateOnePromise<RawUserDocument, "following"> {
//   user.following.push(newFolloweeId);
//   await user.save();
//   return user;
// };

// export const getUsersByQuery = async function (query: string) {
//   const usernameRegex = new RegExp(`(^|_)${query}`, "i");
//   const nameRegex = new RegExp(`(^| )${query}`, "i");
//   const matchedUsers = await User.find({
//     $or: [
//       { username: { $regex: usernameRegex } },
//       { name: { $regex: nameRegex } }
//     ]
//   }).select("_id name username profileImageURL");
//   return matchedUsers;
// };

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
