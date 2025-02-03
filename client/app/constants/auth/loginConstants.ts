import { InputConstantsTypeMap } from "../../types/auth/CommonAuthTypes";
import {
  LoginField,
  PasswordValidatorResults,
  UsernameOrEmailValidatorResults
} from "../../types/auth/LoginTypes";

const loginInputConstants: InputConstantsTypeMap<LoginField> = {
  usernameOrEmail: {
    formField: "usernameOrEmail",
    placeholder: "Username or Email",
    keyboardType: "email-address"
  },
  password: { formField: "password", secureTextEntry: true }
};

export const loginScreenConstants = {
  inputConstants: loginInputConstants,
  errorMessages: {
    usernameOrEmail: {
      [UsernameOrEmailValidatorResults.Empty]:
        "Please enter your username or email."
    },
    password: {
      [PasswordValidatorResults.Empty]: "Please enter your password"
    }
  }
};
