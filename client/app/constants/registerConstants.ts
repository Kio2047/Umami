import { StackScreenProps } from "@react-navigation/stack";
import {
  RegistrationInputConstants,
  RegistrationScreenConstants
} from "../types/CredentialFormTypes";

export const registrationInputConstants: RegistrationInputConstants = {
  email: {
    formField: "email",
    keyboardType: "email-address"
    // errorText: "This is some placeholder error text to test the error text"
    // errorMessages: {}
  },
  fullName: { formField: "fullName", placeholder: "Full Name" },
  username: { formField: "username" },
  password: {
    formField: "password",
    secureTextEntry: true,
    errorText:
      "Your password should have at least 7 characters, a number, and a special character"
  }
};

export const registrationScreenConstants: Record<
  "emailScreen" | "fullNameScreen" | "usernameScreen" | "passwordScreen",
  RegistrationScreenConstants
> = {
  fullNameScreen: {
    heading: "Hi! What's your name?",
    inputConstants: registrationInputConstants.fullName
  },
  emailScreen: {
    heading: "What's your email address?",
    additionalText:
      "Enter an email through which we can reach you. This won't be visible to other users on your profile.",
    inputConstants: registrationInputConstants.email
  },
  passwordScreen: {
    heading: "Create a password",
    additionalText:
      "Enter a password with at least 7 characters. It should contain a number and a special character.",
    inputConstants: registrationInputConstants.password
  },
  usernameScreen: {
    heading: "Create a username",
    additionalText: "Enter a unique username for your profile.",
    inputConstants: registrationInputConstants.username
  }
};
