import {
  InputConstants,
  LoginCredentials,
  LoginFormField,
  NewUserCredentials
} from "../types/auth/AuthTypes.ts";

type LoginInputConstants = Record<
  LoginFormField,
  InputConstants<LoginFormField>
>;

export const loginInputConstants: LoginInputConstants = [
  {
    formField: "usernameOrEmail",
    placeholder: "Username or Email",
    keyboardType: "email-address"
  },
  { formField: "password", secureTextEntry: true }
];
