import { KeyboardTypeOptions } from "react-native/types";
import { LoginCredentials, NewUserCredentials } from "../types";

export const loginScreenConstants: LoginScreenConstants = {
  inputConstants: [
    {
      field: "username or email",
      placeholder: "Username or Email",
      keyboardType: "email-address"
    },
    { field: "password", secureTextEntry: true }
  ]
};

export const registerScreenConstants: RegisterScreenConstants = {
  inputConstants: [
    { field: "email", keyboardType: "email-address" },
    { field: "name" },
    { field: "username" },
    { field: "password", secureTextEntry: true }
  ]
};

interface LoginScreenConstants {
  inputConstants: InputConstants<LoginCredentials>[];
}
interface RegisterScreenConstants {
  inputConstants: InputConstants<NewUserCredentials>[];
}

interface InputConstants<T> {
  field: keyof T;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: true;
}
