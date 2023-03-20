import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type PostRestaurant = {
  _id: string;
  name: string;
};

export type OtherPerson = {
  _id: string;
  name: string;
  profilePictureURL: string;
};

// TODO Rename restaurant ID to 'restaurant', as we're populating this field
// TODO - now disagree with the above - the raw field in the document is the ID, not the restaurant itself

export type Post = {
  _id: string;
  author: string;
  restaurant: PostRestaurant;
  ratings: number[];
  imageURLs: string[];
  timestamp: Date;
  title: string;
  text: string;
  others: OtherPerson[];
  authorName: string;
  authorProfilePictureURL: string;
};

export type User = {
  _id: string;
  name: string;
  profilePictureURL: string;
  posts: string[];
  friends: string[];
};

export type LoginCredentials = {
  "username or email": string;
  password: string;
};

export type NewUserCredentials = {
  email: string;
  name: string;
  username: string;
  password: string;
};

export type NewPost = {
  authorID: string;
  restaurant: string;
  imageURLs: string[];
  ratings: number[];
  title: string;
  text: string;
  others: string[];
  timestamp: Date | undefined;
};

export type formTextFields = "restaurantName" | "title" | "text";
export type formRatingFields = "food" | "vibes" | "value";
