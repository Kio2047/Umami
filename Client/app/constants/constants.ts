import { KeyboardTypeOptions } from "react-native/types";
import { LoginCredentials, NewUserCredentials } from "../types";

export const loginScreenConstants: LoginScreenConstants = {
  inputConstants: [
    {
      formField: "username or email",
      placeholder: "Username or Email",
      keyboardType: "email-address"
    },
    { formField: "password", secureTextEntry: true }
  ]
};

export const registerScreenConstants: RegisterScreenConstants = {
  inputConstants: [
    { formField: "email", keyboardType: "email-address" },
    { formField: "name" },
    { formField: "username" },
    { formField: "password", secureTextEntry: true }
  ]
};

interface LoginScreenConstants {
  inputConstants: InputConstants<LoginCredentials>[];
}
interface RegisterScreenConstants {
  inputConstants: InputConstants<NewUserCredentials>[];
}

export interface InputConstants<T extends Record<string, string>> {
  formField: Extract<keyof T, string>;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: true;
}
