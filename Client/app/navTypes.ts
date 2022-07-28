import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamsList = {
  SignIn: {user: string},
  Login: undefined,
  Home: undefined,
  About: { title: string, body: string },
}

export type SignInScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "SignIn"> };
export type HomeScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Home"> };
export type LoginScreenProps = { navigation: StackNavigationProp<RootStackParamsList, "Login"> };
// type SignInScreenRouteAndNavigationProps = StackNavigationProp<RootStackParamsList, 'SignIn'>;
// export type HomeScreenRouteAndNavigationProps = StackScreenProps<RootStackParamsList, 'Home'>;
export type AboutScreenProps = StackScreenProps<RootStackParamsList, 'About'>;