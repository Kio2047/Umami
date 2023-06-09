import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  BottomTabScreenProps,
  BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";

import { User } from "./SharedTypes";

export type RootStackParamList = {
  LandingPage: undefined;
  Login: undefined;
  Register: undefined;
  AddProfileImage: { newUserName: string };
  // Feed: { feedUserInfo: User };
  AppTabs: undefined;
  DetailedImage: { imageURL: string };
  CreateNewPost: {
    profileImageURL: string;
    authorID: string;
    setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
  };
  UserProfile: {
    profileUserID: string;
    profileUserprofileImageURL: string;
    profileUserName: string;
  };
  RestaurantProfile: { restaurantID: string; restaurantName: string };
  // DetailedPost: {postData: Post, navigation: any },
  About: { title: string; body: string };
};

export type StackScreenProps<screen extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, screen>;
  route: RouteProp<RootStackParamList, screen>;
};

type AppTabsParamlist = {
  Feed: undefined;
  Search: undefined;
};

export type AppTabProps<tab extends keyof AppTabsParamlist> = {
  navigation: StackNavigationProp<AppTabsParamlist, tab>;
  route: RouteProp<AppTabsParamlist, tab>;
};

// export type StackScreenProps<screen extends keyof RootStackParamList> = {
//   navigation: StackScreenNavigationProp<screen>;
//   route: StackScreenRouteProp<screen>;
// };

// export type StackScreenNavigationProp<screen extends keyof RootStackParamList> =
//   {
//     navigation: StackNavigationProp<RootStackParamList, screen>;
//   };

// export type StackScreenRouteProp<screen extends keyof RootStackParamList> = {
//   route: RouteProp<RootStackParamList, screen>;
// };

// export type LandingPageScreenProps = {
//   navigation: StackScreenNavigationProp<"LandingPage">;
// };
// export type LoginScreenProps = {
//   navigation: StackScreenNavigationProp<"Login">;
// };
// export type RegisterScreenProps = {
//   navigation: StackScreenNavigationProp<"Register">;
// };

// export type FeedScreenProps = StackScreenProps<"Feed">;
// //______________________________________________
// export type PostNavigationProp =
//   | StackNavigationProp<RootStackParamList, "Feed">
//   | StackNavigationProp<RootStackParamList, "UserProfile">;
// export type DetailedImageScreenProps = StackScreenProps<
//   RootStackParamList,
//   "DetailedImage"
// >;
// export type CreateNewPostScreenProps = StackScreenProps<
//   RootStackParamList,
//   "CreateNewPost"
// >;
// export type UserProfileScreenProps = StackScreenProps<
//   RootStackParamList,
//   "UserProfile"
// >;
// export type RestaurantProfileScreenProps = StackScreenProps<
//   RootStackParamList,
//   "RestaurantProfile"
// >;

// // export type PostScreenProps = StackScreenProps<RootStackParamList, "Post">
// // export type AboutScreenProps = StackScreenProps<RootStackParamList, 'About'>;
// // type SignInScreenRouteAndNavigationProps = StackNavigationProp<RootStackParamList, 'SignIn'>;
// // export type FeedScreenRouteAndNavigationProps = StackScreenProps<RootStackParamList, 'Feed'>;
