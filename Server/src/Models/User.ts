import { mongoose } from "./index";
import type { UserData, UserCredentials, UserAndPostIDs } from "../types";
import { userSchema } from "./schemas";

const User = mongoose.model("User", userSchema);

// When registering, the app should perform an initial to see check if an account is already
// associated with email before asking for more details such as their name and profilepicture
// export const checkUserExists = async function (email) ...

export const checkUserExists = async function (email: string) {
  console.log(email);
  const account = await User.findOne({email});
  if (account) return true
  else return false
}

export const createNewUser = async function ({email, password, name, profilePictureURL, posts, friends, id}: UserData) {
  const newUser = await User.create({
    _id: id ? id : new mongoose.Types.ObjectId(),
    email,
    password,
    name,
    profilePictureURL,
    posts,
    friends
  });
  return newUser;
}

export const checkUserCredentials = async function ({email, password}: UserCredentials) {
  const account = await User.findOne({email});
  if (!account || password !== account.password) return;
  else return account
}

export const addPostToUser = async function ({userID, postID}: UserAndPostIDs) {
  const account = await User.findOne({ _id: userID });
  // @ts-ignore: Object ID bug
  account.posts.push(postID);
  await account.save();
};

export const searchForUser = async function ( name: string ) {
  const regex = new RegExp(`^${name}`, 'i');
  const matchedUsers = await User.find({ name: {$regex: regex} });
  return matchedUsers;
};

export const loadFeed = async function (userID: string) {

  const feedData = [];

  const account = await User.findOne({_id: userID}).populate({
    path: "friends",
    populate: { path: "posts" }
  });

  for (let friend of account.friends) {
    // Add populate with typescript
    // @ts-ignore: Object ID bug
    for (let post of friend.posts) {
      // @ts-ignore: Object ID bug
      feedData.push({...post.toObject(), authorName: friend.name, profilePictureURL: friend.profilePictureURL});
    };
  };

  return feedData;

}

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

