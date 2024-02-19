import { InputConstantsTypeMap } from "../types/auth/CommonAuthTypes";
import {
  EmailValidatorResults,
  FullNameValidatorResults,
  PasswordValidatorResults,
  RegisterField,
  RegisterScreenConstantsTypeMap,
  UsernameValidatorResults
} from "../types/auth/RegisterTypes";

export const registerInputConstants: InputConstantsTypeMap<RegisterField> = {
  fullName: { formField: "fullName", placeholder: "Full Name" },
  email: {
    formField: "email",
    keyboardType: "email-address"
  },
  username: { formField: "username" },
  password: {
    formField: "password",
    secureTextEntry: true
  }
};

export const registerScreenConstants: RegisterScreenConstantsTypeMap = {
  RegisterFullNameScreen: {
    heading: "Hi! What's your name?",
    fieldConstants: registerInputConstants.fullName,
    errorMessages: {
      [FullNameValidatorResults.Valid]: "",
      [FullNameValidatorResults.Empty]: "Name cannot be empty."
    },
    nextScreen: "RegisterEmailScreen"
  },
  RegisterEmailScreen: {
    heading: "What's your email address?",
    additionalText:
      "Enter an email where we can reach you. This won't be visible to other users on your profile.",
    fieldConstants: registerInputConstants.email,
    errorMessages: {
      [EmailValidatorResults.Valid]: "",
      [EmailValidatorResults.Invalid]: "Please enter a valid email."
    },
    nextScreen: "RegisterUsernameScreen"
  },
  RegisterUsernameScreen: {
    heading: "Create a username",
    additionalText: "Enter a unique username for your profile.",
    fieldConstants: registerInputConstants.username,
    errorMessages: {
      [UsernameValidatorResults.Valid]: "",
      [UsernameValidatorResults.Empty]: "Username cannot be empty.",
      [UsernameValidatorResults.InvalidCharacter]:
        "Username can only include letters, numbers and underscores.",
      [UsernameValidatorResults.TooLong]:
        "Username must be 20 characters or less in length.",
      [UsernameValidatorResults.AlreadyTaken]:
        "Username is already taken. Try creating a new one."
    },
    nextScreen: "RegisterPasswordScreen"
  },
  RegisterPasswordScreen: {
    heading: "Create a password",
    additionalText:
      "Enter a password with at least 7 characters. It should contain a number and a special character.",
    fieldConstants: registerInputConstants.password,
    errorMessages: {
      [PasswordValidatorResults.Valid]: "",
      [PasswordValidatorResults.Empty]: "Password cannot be empty.",
      [PasswordValidatorResults.TooShort]:
        "Password must be at least 7 characters in length.",
      [PasswordValidatorResults.NoSpecialCharacter]:
        "Password must contain at least 1 special character.",
      [PasswordValidatorResults.TooEasy]:
        "Password is too easy to guess. Try creating a new one."
    },
    nextScreen: "AddProfileImageScreen"
  }
};
