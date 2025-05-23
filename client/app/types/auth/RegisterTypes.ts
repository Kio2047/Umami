import { FormActionBase, InputConstants } from "./CommonAuthTypes";

export type RegisterField = "email" | "fullName" | "username" | "password";

export type RegisterScreen =
  | "RegisterEmailScreen"
  | "RegisterFullNameScreen"
  | "RegisterUsernameScreen"
  | "RegisterPasswordScreen";

export type RegisterFormAction<T extends RegisterField> =
  | {
      type: "add_invalid_warning";
      field: T;
      invalidMessage: string;
    }
  | FormActionBase<T>;

export enum UsernameValidatorResults {
  Valid = 0,
  Empty = 1,
  InvalidCharacter = 2,
  TooLong = 3,
  AlreadyTaken = 4
}
export enum EmailValidatorResults {
  Valid = 0,
  Invalid = 1
}
export enum FullNameValidatorResults {
  Valid = 0,
  Empty = 1
}

export enum PasswordValidatorResults {
  Valid = 0,
  Empty = 1,
  TooShort = 2,
  NoSpecialCharacterOrNumber = 3,
  TooEasy = 4
}

export type ValidatorResultsTypeMap = {
  RegisterFullNameScreen: FullNameValidatorResults;
  RegisterEmailScreen: EmailValidatorResults;
  RegisterUsernameScreen: UsernameValidatorResults;
  RegisterPasswordScreen: PasswordValidatorResults;
};

export interface NextScreenTypeMap {
  RegisterFullNameScreen: "RegisterEmailScreen";
  RegisterEmailScreen: "RegisterUsernameScreen";
  RegisterUsernameScreen: "RegisterPasswordScreen";
  RegisterPasswordScreen: "AddProfileImageScreen";
}

export interface RegisterScreenConstants<T extends RegisterScreen> {
  heading: string;
  additionalText?: string;
  inputConstants: InputConstants<RegisterField>;
  errorMessages: Record<ValidatorResultsTypeMap[T], string>;
  nextScreen: NextScreenTypeMap[T];
}

export type RegisterScreenConstantsTypeMap = {
  [K in RegisterScreen]: RegisterScreenConstants<K>;
};

export type NewUserCredentials = Record<RegisterField, string>;

// export interface RegisterInputErrorMessageTypeMap<T extends > {

// }
