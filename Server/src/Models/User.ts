import { mongoose } from "./index";
import { RawUserDocument } from "../types/UserTypes";
// import { RawUserDocument, RawUserDocumentWithID } from "../types/UserTypes";
import {
  FindOnePromise,
  CreateOnePromise,
  UpdateOnePromise,
  FindOneResult,
  NonNullFindOneResult
} from "../types/MongooseCRUDTypes";

import { ProcessedNewUserData } from "../types/UserTypes";
import { NewDummyUserData } from "../types/SeedTypes";
// import { UserCredentials, UserAndPostIDs } from "../types/types";
import { userSchema } from "./schemas";
import { HydratedDocument, NullExpression, Types } from "mongoose";
import { typeSafeSelect } from "../utils";

const User = mongoose.model<RawUserDocument>("User", userSchema);

// TODO: either give each query function a lean boolean argument which if true makes them return a POJO, or create a lean copy of each query function

export const createNewUser = async function (
  newUserData: ProcessedNewUserData
): CreateOnePromise<RawUserDocument> {
  const newUser = await User.create({
    ...newUserData
  });
  return newUser;
};

export const getUserByID = async <
  Fields extends Exclude<keyof RawUserDocument, "passwordHash"> = Exclude<
    keyof RawUserDocument,
    "passwordHash"
  >
>(
  id: string,
  options?: {
    fields: Fields[];
  }
): FindOnePromise<RawUserDocument, Fields> => {
  let account: FindOneResult<RawUserDocument, Fields>;
  if (options?.fields) {
    account = await User.findById(id).select(options.fields.join(" "));
  } else {
    account = await User.findById(id).select("-passwordHash");
  }
  return account;

  // <
  //   fields extends Extract<keyof RawUserDocumentWithID, string>
  // >
};

export const getUserByEmail = async function (
  email: string
): FindOnePromise<RawUserDocument> {
  const account = await User.findOne({
    email: email
  });
  return account;
};

export const replaceUserprofileImageURL = async function (
  user: Omit<HydratedDocument<RawUserDocument>, "passwordHash">,
  newURL: string
) {
  user.profileImageURL = newURL;
  user.save();
};

//TODO: change from save to updateOne for atomicity?

const appendUserFollowers = async function (
  user: NonNullFindOneResult<RawUserDocument, "followers">,
  newFollowerID: mongoose.Types.ObjectId
): UpdateOnePromise<RawUserDocument, "followers"> {
  user.followers.push(new mongoose.Types.ObjectId(newFollowerID));
  await user.save();
  return user;
};

const appendUserFollowing = async function (
  user: NonNullFindOneResult<RawUserDocument, "following">,
  newFollowedID: mongoose.Types.ObjectId
): UpdateOnePromise<RawUserDocument, "following"> {
  user.following.push(new mongoose.Types.ObjectId(newFollowedID));
  await user.save();
  return user;
};

export const updateFollowingBidirectionally = async function (
  follower: NonNullFindOneResult<RawUserDocument, "following">,
  followed: NonNullFindOneResult<RawUserDocument, "followers">
): Promise<
  [
    NonNullFindOneResult<RawUserDocument, "following">,
    NonNullFindOneResult<RawUserDocument, "followers">
  ]
> {
  // TODO: prevent users from following self:
  // if (follower._id === followed._id) throw new Error()
  const [updatedFollower, updatedFollowed] = await Promise.all([
    appendUserFollowing(follower, followed._id),
    appendUserFollowers(followed, follower._id)
  ]);
  return [updatedFollower, updatedFollowed];
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

// export const addPostToUser = async function ({
//   userID,
//   postID
// }: UserAndPostIDs) {
//   const account = await User.findOne({ _id: userID });
//   console.log(account);
//   // @ts-ignore: Object ID bug
//   account.posts.push(postID);
//   await account.save();
// };

// export const getFeedPosts = async function (userID: Types.ObjectId) {
//   const feedPosts = [];

//   const account = await User.findOne({ _id: userID })
//     .populate({
//       path: "posts",
//       populate: [
//         {
//           path: "restaurant",
//           select: "-posts"
//         },
//         {
//           path: "others",
//           select: "_id name profileImageURL"
//         }
//       ]
//     })
//     .populate({
//       path: "friends",
//       populate: {
//         path: "posts",
//         populate: [
//           {
//             path: "restaurant",
//             select: "-posts"
//           },
//           {
//             path: "others",
//             select: "_id name profileImageURL"
//           }
//         ]
//       }
//     });

//   for (let post of account.posts) {
//     feedPosts.push({
//       // @ts-ignore: Object ID bug
//       ...post.toObject(),
//       authorName: account.name,
//       authorprofileImageURL: account.profileImageURL
//     });
//   }

//   for (let friend of account.friends) {
//     // Add populate with typescript
//     // @ts-ignore: Object ID bug
//     for (let post of friend.posts) {
//       // @ts-ignore: Object ID bug
//       feedPosts.push({
//         ...post.toObject(),
//         authorName: friend.name,
//         authorprofileImageURL: friend.profileImageURL
//       });
//     }
//   }
//   console.log("feed posts are:", feedPosts);
//   return feedPosts;
// };

// export const getUserPosts = async function (userID: Types.ObjectId) {
//   const user = await User.findOne({ _id: userID }).populate({
//     path: "posts",
//     populate: [
//       {
//         path: "restaurant",
//         select: "-posts"
//       },
//       {
//         path: "others",
//         select: "_id name profileImageURL"
//       }
//     ]
//     // next commit: feat: implemented FE and BE logic for fetching posts by user
//   });

//   // console.log("The user's post before:", user.posts[0]);

//   const userPosts = user.posts.map((post) => {
//     // @ts-ignore: Object ID bug
//     return {
//       // @ts-ignore: Object ID bug
//       ...post.toObject(),
//       authorName: user.name,
//       authorprofileImageURL: user.profileImageURL
//     };
//   });
//   // console.log("The user's posts after:", userPosts);
//   return userPosts;
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

// For use in DB seeder only
export const createNewDummyUser = async function (
  newDummyUserData: NewDummyUserData
): CreateOnePromise<RawUserDocument> {
  const newDummyUser = await User.create({
    ...newDummyUserData
  });
  return newDummyUser;
};
