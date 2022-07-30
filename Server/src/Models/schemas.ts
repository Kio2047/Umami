
import { mongoose } from "./index";

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  profilePictureURL: {type: String, required: true},
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  friends: {type: [String], required: true}
});

// Make the below properties required

const postSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant"},
  ratings: [Number],
  imageURLs: [String],
  title: String,
  text: String,
  others: [],
});

const restaurantSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
  cuisine: [String],
  averageScore: Number
})
