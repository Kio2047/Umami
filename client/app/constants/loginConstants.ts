import { InputConstantsCollection } from "../types/auth/CommonAuthTypes";
import { LoginField } from "../types/auth/LoginTypes";

export const loginInputConstants: InputConstantsCollection<LoginField> = {
  usernameOrEmail: {
    formField: "usernameOrEmail",
    placeholder: "Username or Email",
    keyboardType: "email-address"
  },
  password: { formField: "password", secureTextEntry: true }
};
