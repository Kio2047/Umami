import { comparePasswords } from "../Modules/auth";

import { mongoose } from "./index";
import { NewUserDetailsPostHash, RawUserDocument } from "../types";
import { UserCredentials, UserAndPostIDs } from "../types";
import { userSchema } from "./schemas";
import { HydratedDocument, Types } from "mongoose";

const User = mongoose.model<RawUserDocument>("User", userSchema);

// When registering, the app should perform an initial to see check if an account is already
// associated with email before asking for more details such as their name and profilepicture
// export const checkUserExists = async function (email) ...

export const checkUserExists = async function (email: string) {
  const account = await User.findOne({ email });
  if (account) return true;
  else return false;
};

export const createNewUser = async function (
  newUserDetails: NewUserDetailsPostHash
) {
  if (!newUserDetails.hasOwnProperty("_id")) {
    newUserDetails._id = new mongoose.Types.ObjectId();
  }
  const newUser = await User.create({
    ...newUserDetails
  });
  return newUser;
};

// export const checkUserCredentials = async function ({
//   email,
//   password
// }: UserCredentials) {
//   const account: null | HydratedDocument<IUser> = await User.findOne({ email });
//   console.log();
//   if (await comparePasswords(password, account.passwordHash)) {
//     return;
//   }
//   const { _id, name, profilePictureURL, posts, friends } = account;
//   return { _id, name, profilePictureURL, posts, friends };
// };

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

// export const searchForUser = async function (name: string) {
//   const regex = new RegExp(`^${name}`, "i");
//   const matchedUsers = await User.find({ name: { $regex: regex } });
//   return matchedUsers;
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
//           select: "_id name profilePictureURL"
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
//             select: "_id name profilePictureURL"
//           }
//         ]
//       }
//     });

//   for (let post of account.posts) {
//     feedPosts.push({
//       // @ts-ignore: Object ID bug
//       ...post.toObject(),
//       authorName: account.name,
//       authorProfilePictureURL: account.profilePictureURL
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
//         authorProfilePictureURL: friend.profilePictureURL
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
//         select: "_id name profilePictureURL"
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
//       authorProfilePictureURL: user.profilePictureURL
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

// var requiredAttrs = ['name', 'profilePictureURL', "posts", "friends"];

// requiredAttrs.forEach((attr) => {
//   schema[attr].required! = true;
// })

// for (let attr of requiredAttrs) { schema[attr].required = true; }
