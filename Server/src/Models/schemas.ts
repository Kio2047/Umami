
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
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const postSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  authorID: { type: Schema.Types.ObjectId, ref: "User" },
  restaurantID: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  ratings: [Number],
  imageURLs: [String],
  timestamp: Date,
  title: String,
  text: String,
  others: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const restaurantSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  // cuisine: [String],
  // averageScore: Number,
  // location: String
})