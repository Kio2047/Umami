import { StackScreenProps } from "@react-navigation/stack"

export type RootStackParamsList = {
  SignIn: {user: string},
  Home: undefined,
  About: { title: string, body: string },
}

export type SignInProps = StackScreenProps<RootStackParamsList, 'SignIn'>;
export type HomeProps = StackScreenProps<RootStackParamsList, 'Home'>;
export type AboutProps = StackScreenProps<RootStackParamsList, 'About'>;