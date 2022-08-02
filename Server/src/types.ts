// import { ObjectId } from "bson"
import { Types } from "mongoose"

export type UserData = {
  id?: Types.ObjectId,
  email: string,
  password: string,
  name: string,
  profilePictureURL: string,
  posts: Types.ObjectId[],
  friends: Types.ObjectId[]
}

export type PostData = {
  id? : Types.ObjectId,
  authorID: Types.ObjectId,
  restaurantID: Types.ObjectId,
  ratings: number[],
  imageURLs: string[],
  title: string,
  text: string
  timestamp: Date,
  others?: Types.ObjectId[],
}

export type RestaurantData = {
  id?: Types.ObjectId,
  name: string,
  posts: Types.ObjectId[]
}

export type UserCredentials = {
  email: string,
  password: string,
}

export type RestaurantNewPost = {
  name: string,
  postID: Types.ObjectId
}

export type UserAndPostIDs = {
  userID: Types.ObjectId,
  postID: Types.ObjectId
}