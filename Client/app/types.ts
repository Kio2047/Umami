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

export type UserCredentials = {
  email: string;
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

export type RootStackParamsList = {
  LandingPage: undefined;
  Login: undefined;
  Register: undefined;
  Feed: { feedUserInfo: User };
  DetailedImage: { imageURL: string };
  CreateNewPost: {
    profilePictureURL: string;
    authorID: string;
    setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
  };
  UserProfile: {
    profileUserID: string;
    profileUserProfilePictureURL: string;
    profileUserName: string;
  };
  RestaurantProfile: { restaurantID: string; restaurantName: string };
  // DetailedPost: {postData: Post, navigation: any },
  About: { title: string; body: string };
};

export type formTextFields = "restaurantName" | "title" | "text";
export type formRatingFields = "food" | "vibes" | "value";

export type LandingPageScreenProps = {
  navigation: StackNavigationProp<RootStackParamsList, "LandingPage">;
};
export type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamsList, "Login">;
};
export type RegisterScreenProps = {
  navigation: StackNavigationProp<RootStackParamsList, "Register">;
};
export type FeedScreenProps = StackScreenProps<RootStackParamsList, "Feed">;
export type PostNavigationProp =
  | StackNavigationProp<RootStackParamsList, "Feed">
  | StackNavigationProp<RootStackParamsList, "UserProfile">;
export type DetailedImageScreenProps = StackScreenProps<
  RootStackParamsList,
  "DetailedImage"
>;
export type CreateNewPostScreenProps = StackScreenProps<
  RootStackParamsList,
  "CreateNewPost"
>;
export type UserProfileScreenProps = StackScreenProps<
  RootStackParamsList,
  "UserProfile"
>;
export type RestaurantProfileScreenProps = StackScreenProps<
  RootStackParamsList,
  "RestaurantProfile"
>;

// export type PostScreenProps = StackScreenProps<RootStackParamsList, "Post">
// export type AboutScreenProps = StackScreenProps<RootStackParamsList, 'About'>;
// type SignInScreenRouteAndNavigationProps = StackNavigationProp<RootStackParamsList, 'SignIn'>;
// export type FeedScreenRouteAndNavigationProps = StackScreenProps<RootStackParamsList, 'Feed'>;
