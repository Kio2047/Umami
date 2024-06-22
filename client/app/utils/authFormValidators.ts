import {
  EmailValidatorResults,
  FullNameValidatorResults,
  PasswordValidatorResults,
  UsernameValidatorResults
} from "../types/auth/RegisterTypes";

// TODO: pull all register form validations up to root level shared folder for SSOT

export const formValidators = {
  fullName: (fullName: string): FullNameValidatorResults => {
    if (!fullName) return FullNameValidatorResults.Empty;
    else return FullNameValidatorResults.Valid;
  },
  email: (email: string): EmailValidatorResults => {
    // Basic string validation for emails
    return /\S+@\S+\.\S+/.test(email)
      ? EmailValidatorResults.Valid
      : EmailValidatorResults.Invalid;
  },
  username: (username: string): UsernameValidatorResults => {
    if (!username) return UsernameValidatorResults.Empty;
    if (/[^A-Za-z0-9_]/.test(username))
      return UsernameValidatorResults.InvalidCharacter;
    if (username.length > 20) return UsernameValidatorResults.TooLong;
    // TODO: add request to check to add if username already exists
    else return UsernameValidatorResults.Valid;
  },
  password: (password: string): PasswordValidatorResults => {
    if (!password) return PasswordValidatorResults.Empty;
    if (password.length < 7) return PasswordValidatorResults.TooShort;
    if (!/[^A-Za-z0-9\s]/.test(password) || !/[0-9]/.test(password))
      return PasswordValidatorResults.NoSpecialCharacterOrNumber;
    // TODO: implement basic password strength algorithm (entropy calculation)
    else return PasswordValidatorResults.Valid;
  }
};
