import {
  EmailValidation,
  FullNameValidation,
  PasswordValidation
} from "../types/auth/AuthTypes.ts";

export const calculatePostTimestamp = function (timestamp: Date) {
  timestamp = new Date(timestamp);
  const millisecondsInMinute = 1000 * 60;
  const milliSecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = milliSecondsInHour * 24;
  const timeSincePost = Date.now() - timestamp.getTime();

  if (timeSincePost > millisecondsInDay)
    return Math.floor(timeSincePost / millisecondsInDay) + "d";
  if (timeSincePost > milliSecondsInHour)
    return Math.floor(timeSincePost / milliSecondsInHour) + "hr";
  const minutes = Math.floor(timeSincePost / millisecondsInMinute);
  return minutes > 1 ? minutes + "mins" : "1min";
};

export const formValidations = {
  fullName: (fullName: string): FullNameValidation => {
    if (!fullName) return FullNameValidation.Empty;
    else return FullNameValidation.Valid;
  },
  email: (email: string): EmailValidation => {
    // Basic string validation for emails
    return /\S+@\S+\.\S+/.test(email)
      ? EmailValidation.Valid
      : EmailValidation.Invalid;
  },
  password: (password: string): PasswordValidation => {
    if (!password) return PasswordValidation.Empty;
    if (password.length < 7) return PasswordValidation.TooShort;
    if (!/[^A-Za-z0-9\s]/.test(password))
      return PasswordValidation.NoSpecialCharacter;
    // TODO: implement basic password strength algorithm (entropy calculation)
    else return PasswordValidation.Valid;
  }
  // username: (username: string):
};
// name: (name) => 0,
// username: (username) => {

// },
// usernameOrEmail: (usernameOrEmail) => true,
// password: (password) =>
//   password.length >= 7 &&
//   /[0-9]/.test(password) &&
//   /[^A-Za-z0-9]/.test(password)

// export const validateRegistrationForm = function (
//   newUserCredentials: NewUserCredentials
// ): { [k in keyof NewUserCredentials]: boolean } & { form: boolean } {
//   const { email, name, password, username } = newUserCredentials;
//   const formValidity = {
//     email: false,
//     name: false,
//     password: false,
//     username: false,
//     form: false
//   };
//   if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
//     formValidity.password = true;
//   }
//   //TODO: validate email
//   if (true) {
//     formValidity.email = true;
//   }
//   //TODO: validate username (only alphanumeric characters, underscores and periods)
//   if (true) {
//     formValidity.username = true;
//   }
//   //TODO: validate name
//   if (true) {
//     formValidity.email = true;
//   }
//   const values = Object.values(formValidity);
//   if (values.indexOf(false) === values.lastIndexOf(false)) {
//     formValidity.form = true;
//   }
//   return formValidity;
// };
