import {
  EmailValidatorResults,
  FullNameValidatorResults,
  PasswordValidatorResults
} from "../types/auth/RegisterTypes";

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
  password: (password: string): PasswordValidatorResults => {
    if (!password) return PasswordValidatorResults.Empty;
    if (password.length < 7) return PasswordValidatorResults.TooShort;
    if (!/[^A-Za-z0-9\s]/.test(password))
      return PasswordValidatorResults.NoSpecialCharacter;
    // TODO: implement basic password strength algorithm (entropy calculation)
    else return PasswordValidatorResults.Valid;
  }
  // username: (username: string):
};
