import { KeyboardTypeOptions } from "react-native/types";
import {
  LoginCredentials,
  LoginFormField,
  NewUserCredentials,
  RegisterFormField
} from "../Types/CredentialFormTypes";

interface InputConstants<T extends LoginFormField | RegisterFormField> {
  // formField: Extract<keyof T, string>;
  formField: T;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: true;
}

type LoginScreenConstants = InputConstants<LoginFormField>[];

type RegisterScreenConstants = InputConstants<RegisterFormField>[];

export const loginScreenFormConstants: LoginScreenConstants = [
  {
    formField: "usernameOrEmail",
    placeholder: "Username or Email",
    keyboardType: "email-address"
  },
  { formField: "password", secureTextEntry: true }
];

export const registerScreenFormConstants: RegisterScreenConstants = [
  { formField: "email", keyboardType: "email-address" },
  { formField: "name" },
  { formField: "username" },
  { formField: "password", secureTextEntry: true }
];
