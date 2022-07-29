import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

type PostProps = {
  user: string,
  scores: {food: number, vibes: number, value: number},
  images: string[],
  text: string,
  restaurant: string
}

export type RootStackParamsList = {
  SignIn: {user: string},
  Login: undefined,
  Register: undefined,
  Home: undefined,
  Post: PostProps,
  About: { title: string, body: string },
}

export type SignInScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "SignIn"> };
export type LoginScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Login"> };
export type RegisterScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Register"> };
export type HomeScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Home"> };
export type PostScreenProps = StackScreenProps<RootStackParamsList, "Post">
export type AboutScreenProps = StackScreenProps<RootStackParamsList, 'About'>;
// type SignInScreenRouteAndNavigationProps = StackNavigationProp<RootStackParamsList, 'SignIn'>;
// export type HomeScreenRouteAndNavigationProps = StackScreenProps<RootStackParamsList, 'Home'>;