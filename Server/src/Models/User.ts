import { mongoose } from "./index";
import type { UserData, UserCredentials } from "../types";
import { userSchema } from "./schemas";

const User = mongoose.model("User", userSchema);

// When registering, the app should perform an initial to see check if an account is already
// associated with email before asking for more details such as their name and profilepicture
// export const checkUserExists = async function (email) ...

export const checkUserExists = async function (email: string) {
  console.log(email);
  const account = await User.findOne({email});
    // @ts-ignore: Unreachable code error
  if (account) return true
  else return false
}

export const createNewUser = async function ({email, password, name, profilePictureURL, posts, friends, id}: UserData) {
  const newUser = await User.create({
    _id: id ? id : new mongoose.Types.ObjectId,
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

export const loadFeed = async function (userID: string) {

  const feedData = [];

  // const account = await User.findOne({_id: userID})

  // const account = await User.findOne({_id: userID}).populate("friends");


  const account = await User.findOne({_id: userID}).populate({
    path: "friends",
    // populate: { path: "posts" }
  });

  // for (let friend of account.friends) {
  //   for (let post of friend.posts) {
  //     const postData = {friend.name, friend.profilePictureURL, ...post}
  //   }
  // }

  return account;

  // flatmap

}


// Cleaner way of making them required below

// var requiredAttrs = ['name', 'profilePictureURL', "posts", "friends"];

// requiredAttrs.forEach((attr) => {
//   schema[attr].required! = true;
// })

// for (let attr of requiredAttrs) { schema[attr].required = true; }

