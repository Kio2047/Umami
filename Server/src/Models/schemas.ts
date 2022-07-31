
import { mongoose } from "./index";

const { Schema } = mongoose;

// Make the schema properties required where necessary

export const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  name: String,
  profilePictureURL: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  friends: [{type: Schema.Types.ObjectId, ref: "User"}]
});

export const postSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant"},
  ratings: [Number],
  imageURLs: [String],
  timeStamp: Date,
  title: String,
  text: String,
  others: [],
});

export const restaurantSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  posts: [{type: Schema.Types.ObjectId, ref: "Post"}]
  // cuisine: [String],
  // averageScore: Number,
  // location: String
})