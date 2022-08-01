import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

// replace type string with objectID where necessary

export type PostRestaurant = {
  _id: string,
  name: string,
}

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
  others: string[],
  authorName: string,
  authorProfilePictureURL: string
}

export type User = {
  _id: string,
  name: string,
  profilePictureURL: string,
  posts: string[],
  friends: string[]
}

export type RootStackParamsList = {
  SignIn: undefined,
  Login: undefined,
  Register: undefined,
  Feed: {feedUserInfo: User},
  DetailedPost: {postData: Post}
  About: { title: string, body: string },
}

export type UserCredentials = {
  email: string,
  password: string,
}

export type SignInScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "SignIn"> };
export type LoginScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Login"> };
export type RegisterScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Register"> };
export type FeedScreenProps = StackScreenProps<RootStackParamsList, "Feed">;
// export type PostScreenProps = StackScreenProps<RootStackParamsList, "Post">
export type AboutScreenProps = StackScreenProps<RootStackParamsList, 'About'>;
// type SignInScreenRouteAndNavigationProps = StackNavigationProp<RootStackParamsList, 'SignIn'>;
// export type FeedScreenRouteAndNavigationProps = StackScreenProps<RootStackParamsList, 'Feed'>;