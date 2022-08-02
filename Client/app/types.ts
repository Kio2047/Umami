import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

// replace type string with objectID where necessary

export type PostRestaurant = {
  _id: string,
  name: string,
};

export type OtherPerson = {
  _id: string,
  name: string,
  profilePictureURL: string
};

// Rename restaurant ID to 'restaurant', as we're populating this field

export type Post = {
  _id: string,
  authorID: string,
  restaurantID: PostRestaurant,
  ratings: number[],
  imageURLs: string[],
  timestamp: Date,
  title: string,
  text: string,
  others: OtherPerson[],
  authorName: string,
  authorProfilePictureURL: string
};

export type User = {
  _id: string,
  name: string,
  profilePictureURL: string,
  posts: string[],
  friends: string[]
};

export type UserCredentials = {
  email: string,
  password: string,
};

export type NewPost = {
  authorID: string,
  restaurantName: string,
  imageURLs: string[],
  ratings: number[],
  title: string,
  text: string,
  others: string[],
  timestamp: Date | undefined
};

export type RootStackParamsList = {
  SignIn: undefined,
  Login: undefined,
  Register: undefined,
  Feed: { feedUserInfo: User },
  DetailedImage: { imageURL: string },
  CreateNewPost: { profilePictureURL: string, authorID: string, setRefreshCount: React.Dispatch<React.SetStateAction<number>> },
  // DetailedPost: {postData: Post, navigation: any },
  About: { title: string, body: string },
};

export type formTextFields = "restaurantName" | "title" | "text";
export type formRatingFields = "food" | "vibes" | "value";

export type SignInScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "SignIn"> };
export type LoginScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Login"> };
export type RegisterScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Register"> };
export type FeedScreenProps = StackScreenProps<RootStackParamsList, "Feed">;
export type PostNavigationProp = StackNavigationProp<RootStackParamsList, "Feed">;
export type DetailedImageScreenProps = StackScreenProps<RootStackParamsList, 'DetailedImage'>;
export type CreateNewPostScreenProps = StackScreenProps<RootStackParamsList, 'CreateNewPost'>;
// export type PostScreenProps = StackScreenProps<RootStackParamsList, "Post">
// export type AboutScreenProps = StackScreenProps<RootStackParamsList, 'About'>;
// type SignInScreenRouteAndNavigationProps = StackNavigationProp<RootStackParamsList, 'SignIn'>;
// export type FeedScreenRouteAndNavigationProps = StackScreenProps<RootStackParamsList, 'Feed'>;