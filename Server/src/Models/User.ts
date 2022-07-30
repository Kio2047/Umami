import { mongoose } from "./index";
import type { User, UserCredentials } from "../types";

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  profilePictureURL: {type: String, required: true},
  posts: {type: [String], required: true},
  friends: {type: [String], required: true}
});

const User = mongoose.model("User", userSchema);

// When registering, the app should perform an initial to see check if an account is already
// associated with email before asking for more details such as their name and profilepicture
// export const checkUserExists = async function (email) ...

export const createNewUser = async function ({email, password, name, profilePictureURL, posts, friends}: User) {

  const account = await User.findOne({email});

  if (account) return;
  const newUser = await User.create({
    email,
    password,
    name,
    profilePictureURL,
    posts,
    friends
  });

}

export const checkUserCredentialsAndLoadFeed = async function ({email, password}: UserCredentials) {
  const account = await User.findOne({email});
  if (!account) return "account does not exist";
  else if (password !== account.password) return "wrong password";
  else {
    for
  }

}

// Cleaner way of making them required below

// var requiredAttrs = ['name', 'profilePictureURL', "posts", "friends"];

// requiredAttrs.forEach((attr) => {
//   schema[attr].required! = true;
// })

// for (let attr of requiredAttrs) { schema[attr].required = true; }

