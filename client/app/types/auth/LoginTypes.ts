import { FormActionBase, InputConstants } from "./CommonAuthTypes";

export type LoginField = "usernameOrEmail" | "password";

export type LoginFormAction<T extends LoginField> =
  | {
      type: "add_invalid_warning";
      fields: [T];
      invalidMessages: [string];
    }
  | {
      type: "add_invalid_warning";
      fields: [T, T];
      invalidMessages: [string, string];
    }
  | FormActionBase<T>;

export enum UsernameOrEmailValidatorResults {
  Valid = 0,
  Empty = 1
  // Invalid = 2
}

export enum PasswordValidatorResults {
  Valid = 0,
  Empty = 1
}

export type LoginInputConstants = Record<
  LoginField,
  InputConstants<LoginField>
>;

export type ExistingUserCredentials = Record<LoginField, string>;

// export type LoginScreenConstants = {
//   inputConstants: Record<LoginField, InputConstants<LoginField>>;
//   errorMessages: {};
// };

// export interface RegisterScreenConstants<T extends RegisterScreen> {
//   heading: string;
//   additionalText?: string;
//   inputConstants: InputConstants<RegisterField>;
//   errorMessages: Record<ValidatorResultsTypeMap[T], string>;
//   nextScreen: NextScreenTypeMap[T];
// }
