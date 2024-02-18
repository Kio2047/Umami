import { StackScreenProps } from "@react-navigation/stack";
import {
  EmailValidation,
  FullNameValidation,
  PasswordValidation,
  RegisterFormScreen,
  RegisterInputConstants,
  RegisterScreenConstants,
  ScreenConstants,
  UsernameValidation
} from "../types/auth/AuthTypes.ts";

export const registerInputConstants: RegisterInputConstants = {
  fullName: { formField: "fullName", placeholder: "Full Name" },
  email: {
    formField: "email",
    keyboardType: "email-address"
    // errorText: "This is some placeholder error text to test the error text"
    // errorMessages: {}
  },
  username: { formField: "username" },
  password: {
    formField: "password",
    secureTextEntry: true,
    errorText:
      "Your password should have at least 7 characters, a number, and a special character"
  }
};

export const registrationScreenConstants: RegisterScreenConstants = {
  RegistrationFullNameScreen: {
    heading: "Hi! What's your name?",
    inputConstants: registerInputConstants.fullName,
    errorMessages: {
      [FullNameValidation.Valid]: "",
      [FullNameValidation.Empty]: "Name cannot be empty."
    },
    nextScreen: "RegistrationEmailScreen"
  },
  RegistrationEmailScreen: {
    heading: "What's your email address?",
    additionalText:
      "Enter an email where we can reach you. This won't be visible to other users on your profile.",
    inputConstants: registerInputConstants.email,
    errorMessages: {
      [EmailValidation.Valid]: "",
      [EmailValidation.Invalid]: "Please enter a valid email."
    },
    nextScreen: "RegistrationUsernameScreen"
  },
  RegistrationUsernameScreen: {
    heading: "Create a username",
    additionalText: "Enter a unique username for your profile.",
    inputConstants: registerInputConstants.username,
    errorMessages: {
      [UsernameValidation.Valid]: "",
      [UsernameValidation.Empty]: "Username cannot be empty.",
      [UsernameValidation.InvalidCharacter]:
        "Username can only include letters, numbers and underscores.",
      [UsernameValidation.TooLong]:
        "Username must be less than 20 characters in length."
    },
    nextScreen: "RegistrationPasswordScreen"
  },
  RegistrationPasswordScreen: {
    heading: "Create a password",
    additionalText:
      "Enter a password with at least 7 characters. It should contain a number and a special character.",
    inputConstants: registerInputConstants.password,
    errorMessages: {
      [PasswordValidation.Valid]: "",
      [PasswordValidation.Empty]: "Password cannot be empty.",
      [PasswordValidation.TooShort]:
        "Password must be at least 7 characters in length.",
      [PasswordValidation.NoSpecialCharacter]:
        "Password must contain at least 1 special character.",
      [PasswordValidation.TooEasy]:
        "Password is too easy to guess. Try creating a new one."
    },
    nextScreen: "AddProfileImageScreen"
  }
};
