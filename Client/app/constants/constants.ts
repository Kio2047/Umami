import { KeyboardTypeOptions } from "react-native/types";
import { NewUserCredentials } from "../types";

export const registerScreenConstants: RegisterScreenConstants = {
  inputConstants: [
    { field: "email", keyboardType: "email-address" },
    { field: "name" },
    { field: "username" },
    { field: "password", secureTextEntry: true }
  ]
};

interface RegisterScreenConstants {
  inputConstants: {
    field: keyof NewUserCredentials;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: true;
  }[];
}
