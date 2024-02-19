import { InputConstants } from "./CommonAuthTypes";

export type LoginField = "usernameOrEmail" | "password";

export type LoginInputConstants = Record<
  LoginField,
  InputConstants<LoginField>
>;
