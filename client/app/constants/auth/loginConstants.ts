import { InputConstantsTypeMap } from "../../types/auth/CommonAuthTypes";
import { LoginField } from "../../types/auth/LoginTypes";

export const loginInputConstants: InputConstantsTypeMap<LoginField> = {
  usernameOrEmail: {
    formField: "usernameOrEmail",
    placeholder: "Username or Email",
    keyboardType: "email-address"
  },
  password: { formField: "password", secureTextEntry: true }
};
