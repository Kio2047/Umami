import { KeyboardTypeOptions } from "react-native/types";
import { LoginCredentials, NewUserCredentials } from "../Types/SharedTypes";

export interface InputConstants<
  T extends LoginCredentials | NewUserCredentials
> {
  // formField: Extract<keyof T, string>;
  formField: T extends LoginCredentials
    ? keyof LoginCredentials
    : keyof NewUserCredentials;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: true;
}

type LoginScreenConstants = InputConstants<LoginCredentials>[];

type RegisterScreenConstants = InputConstants<NewUserCredentials>[];

export const loginScreenConstants: LoginScreenConstants = [
  {
    formField: "usernameOrEmail",
    placeholder: "Username or Email",
    keyboardType: "email-address"
  },
  { formField: "password", secureTextEntry: true }
];

export const registerScreenConstants: RegisterScreenConstants = [
  { formField: "email", keyboardType: "email-address" },
  { formField: "name" },
  { formField: "username" },
  { formField: "password", secureTextEntry: true }
];
