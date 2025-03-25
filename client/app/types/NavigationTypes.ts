import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  BottomTabScreenProps,
  BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}

export type AuthStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  RegisterFullNameScreen: undefined;
  RegisterEmailScreen: undefined;
  RegisterUsernameScreen: undefined;
  RegisterPasswordScreen: undefined;
  AddProfileImageScreen: undefined;
};

export type AppTabParamList = {
  FeedScreen: undefined;
  SearchScreen: undefined;
  RestaurantProfileScreen: { restaurantID: string; restaurantName: string };
  AboutScreen: { title: string; body: string };
  // DetailedPost: {postData: Post, navigation: any },
  // Feed: { feedUserInfo: User };
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
};

export type StackScreenProps<screen extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, screen>;
  route: RouteProp<AuthStackParamList, screen>;
};

export type AppTabProps<tab extends keyof AppTabParamList> = {
  navigation: StackNavigationProp<AppTabParamList, tab>;
  route: RouteProp<AppTabParamList, tab>;
};

// export type StackScreenProps<screen extends keyof AuthStackParamList> = {
//   navigation: StackScreenNavigationProp<screen>;
//   route: StackScreenRouteProp<screen>;
// };

// export type StackScreenNavigationProp<screen extends keyof AuthStackParamList> =
//   {
//     navigation: StackNavigationProp<AuthStackParamList, screen>;
//   };

// export type StackScreenRouteProp<screen extends keyof AuthStackParamList> = {
//   route: RouteProp<AuthStackParamList, screen>;
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
//   | StackNavigationProp<AuthStackParamList, "Feed">
//   | StackNavigationProp<AuthStackParamList, "UserProfile">;
// export type DetailedImageScreenProps = StackScreenProps<
//   AuthStackParamList,
//   "DetailedImage"
// >;
// export type CreateNewPostScreenProps = StackScreenProps<
//   AuthStackParamList,
//   "CreateNewPost"
// >;
// export type UserProfileScreenProps = StackScreenProps<
//   AuthStackParamList,
//   "UserProfile"
// >;
// export type RestaurantProfileScreenProps = StackScreenProps<
//   AuthStackParamList,
//   "RestaurantProfile"
// >;

// // export type PostScreenProps = StackScreenProps<AuthStackParamList, "Post">
// // export type AboutScreenProps = StackScreenProps<AuthStackParamList, 'About'>;
// // type SignInScreenRouteAndNavigationProps = StackNavigationProp<AuthStackParamList, 'SignIn'>;
// // export type FeedScreenRouteAndNavigationProps = StackScreenProps<AuthStackParamList, 'Feed'>;
