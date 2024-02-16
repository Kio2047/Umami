import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  BottomTabScreenProps,
  BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";

import { User } from "./CredentialFormTypes";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  RegistrationFullNameScreen: undefined;
  RegistrationEmailScreen: undefined;
  RegistrationUsernameScreen: undefined;
  RegistrationPasswordScreen: undefined;
  AddProfileImageScreen: { newUserName: string };
  // Feed: { feedUserInfo: User };
  AppTabsScreen: undefined;
  DetailedImageScreen: { imageURL: string };
  CreateNewPostScreen: {
    profileImageURL: string;
    authorID: string;
    setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
  };
  UserProfileScreen: {
    profileUserID: string;
    profileUserprofileImageURL: string;
    profileUserName: string;
  };
  RestaurantProfileScreen: { restaurantID: string; restaurantName: string };
  // DetailedPost: {postData: Post, navigation: any },
  AboutScreen: { title: string; body: string };
};

export type StackScreenProps<screen extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, screen>;
  route: RouteProp<RootStackParamList, screen>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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

// export type WelcomeScreenScreenProps = {
//   navigation: StackScreenNavigationProp<"WelcomeScreen">;
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
