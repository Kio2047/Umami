import {
  UsernameOrEmailValidatorResults,
  PasswordValidatorResults as LoginPasswordValidatorResults
} from "../types/auth/LoginTypes";
import {
  EmailValidatorResults,
  FullNameValidatorResults,
  UsernameValidatorResults,
  PasswordValidatorResults as RegisterPasswordValidatorResults
} from "../types/auth/RegisterTypes";

// TODO: pull all register form validations up to root level shared folder for SSOT

export const loginFormValidators = {
  usernameOrEmail(usernameOrEmail: string): UsernameOrEmailValidatorResults {
    if (!usernameOrEmail) return UsernameOrEmailValidatorResults.Empty;
    // if (
    //   registerFormValidators.username(usernameOrEmail) ||
    //   registerFormValidators.email(usernameOrEmail)
    // )
    return UsernameOrEmailValidatorResults.Valid;
    // else return UsernameOrEmailValidatorResults.Invalid;
  },
  password(password: string): LoginPasswordValidatorResults {
    if (!password) return LoginPasswordValidatorResults.Empty;
    else return LoginPasswordValidatorResults.Valid;
  }
};

export const registerFormValidators = {
  fullName(fullName: string): FullNameValidatorResults {
    if (!fullName) return FullNameValidatorResults.Empty;
    else return FullNameValidatorResults.Valid;
  },
  email(email: string): EmailValidatorResults {
    // Basic string validation for emails
    return /\S+@\S+\.\S+/.test(email)
      ? EmailValidatorResults.Valid
      : EmailValidatorResults.Invalid;
  },
  username(username: string): UsernameValidatorResults {
    if (!username) return UsernameValidatorResults.Empty;
    if (/[^A-Za-z0-9_]/.test(username))
      return UsernameValidatorResults.InvalidCharacter;
    if (username.length > 20) return UsernameValidatorResults.TooLong;
    // TODO: add request to check to add if username already exists
    else return UsernameValidatorResults.Valid;
  },
  password(password: string): RegisterPasswordValidatorResults {
    if (!password) return RegisterPasswordValidatorResults.Empty;
    if (password.length < 7) return RegisterPasswordValidatorResults.TooShort;
    if (!/[^A-Za-z0-9\s]/.test(password) || !/[0-9]/.test(password))
      return RegisterPasswordValidatorResults.NoSpecialCharacterOrNumber;
    // TODO: implement basic password strength algorithm (entropy calculation)
    else return RegisterPasswordValidatorResults.Valid;
  }
};
