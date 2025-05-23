import { InputConstantsTypeMap } from "../../types/auth/CommonAuthTypes";
import {
  EmailValidatorResults,
  FullNameValidatorResults,
  PasswordValidatorResults,
  RegisterField,
  RegisterScreenConstantsTypeMap,
  UsernameValidatorResults
} from "../../types/auth/RegisterTypes";

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
    inputConstants: registerInputConstants.fullName,
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
    inputConstants: registerInputConstants.email,
    errorMessages: {
      [EmailValidatorResults.Valid]: "",
      [EmailValidatorResults.Invalid]: "Please enter a valid email."
    },
    nextScreen: "RegisterUsernameScreen"
  },
  RegisterUsernameScreen: {
    heading: "Create a username",
    additionalText: "Enter a unique username for your profile.",
    inputConstants: registerInputConstants.username,
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
      "Enter a password with at least 7 characters. Include both a number and a special character.",
    inputConstants: registerInputConstants.password,
    errorMessages: {
      [PasswordValidatorResults.Valid]: "",
      [PasswordValidatorResults.Empty]: "Password cannot be empty.",
      [PasswordValidatorResults.TooShort]:
        "Password must be at least 7 characters in length.",
      [PasswordValidatorResults.NoSpecialCharacterOrNumber]:
        "Password must contain a special character and a number.",
      [PasswordValidatorResults.TooEasy]:
        "Password is too easy to guess. Try creating a new one."
    },
    nextScreen: "AddProfileImageScreen"
  }
};

// const registerInputErrorMessages = {
//   fullName: {
//     [FullNameValidatorResults.Valid]: "",
//     [FullNameValidatorResults.Empty]: "Name cannot be empty."
//   },
//   email: {
//     [EmailValidatorResults.Valid]: "",
//     [EmailValidatorResults.Invalid]: "Please enter a valid email."
//   },
//   username: {
//     [UsernameValidatorResults.Valid]: "",
//     [UsernameValidatorResults.Empty]: "Username cannot be empty.",
//     [UsernameValidatorResults.InvalidCharacter]:
//       "Username can only include letters, numbers and underscores.",
//     [UsernameValidatorResults.TooLong]:
//       "Username must be 20 characters or less in length.",
//     [UsernameValidatorResults.AlreadyTaken]:
//       "Username is already taken. Try creating a new one."
//   },
//   password: {
//     [PasswordValidatorResults.Valid]: "",
//     [PasswordValidatorResults.Empty]: "Password cannot be empty.",
//     [PasswordValidatorResults.TooShort]:
//       "Password must be at least 7 characters in length.",
//     [PasswordValidatorResults.NoSpecialCharacterOrNumber]:
//       "Password must contain a special character and a number.",
//     [PasswordValidatorResults.TooEasy]:
//       "Password is too easy to guess. Try creating a new one."
//   }
// };
