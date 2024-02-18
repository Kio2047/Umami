import { KeyboardTypeOptions } from "react-native";

export type LoginFormField = "usernameOrEmail" | "password";
export type RegisterFormField = "email" | "fullName" | "username" | "password";
export type RegisterFormScreen =
  | "RegistrationEmailScreen"
  | "RegistrationFullNameScreen"
  | "RegistrationUsernameScreen"
  | "RegistrationPasswordScreen";

export interface FormFieldState {
  value: string;
  valid: boolean;
  highlight: boolean;
  focused: boolean;
  error: boolean;
}

export type FormState<T extends LoginFormField | RegisterFormField> = Record<
  T,
  FormFieldState
>;

export type FormAction<T extends LoginFormField | RegisterFormField> =
  | {
      type: "highlight_fields";
      fields: T[];
    }
  | {
      type: "blur_field";
      field: T;
    }
  | {
      type: "focus_field";
      field: T;
    }
  | {
      // type: "update_and_validate_field";
      type: "update_field";
      field: T;
      value: string;
    };

export interface InputConstants<T extends LoginFormField | RegisterFormField> {
  formField: T;
  placeholder?: string;
  errorText?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: true;
}

export type RegisterInputConstants = Record<
  RegisterFormField,
  InputConstants<RegisterFormField>
>;

export enum PasswordValidation {
  Valid = 0,
  Empty = 1,
  TooShort = 2,
  NoSpecialCharacter = 3,
  TooEasy = 4
}
export enum UsernameValidation {
  Valid = 0,
  Empty = 1,
  InvalidCharacter = 2,
  TooLong = 3
}
export enum EmailValidation {
  Valid = 0,
  Invalid = 1
}
export enum FullNameValidation {
  Valid = 0,
  Empty = 1
}

export type ValidationResultsMap = {
  RegistrationFullNameScreen: FullNameValidation;
  RegistrationEmailScreen: EmailValidation;
  RegistrationUsernameScreen: UsernameValidation;
  RegistrationPasswordScreen: PasswordValidation;
};

export interface NextScreenMap {
  RegistrationFullNameScreen: "RegistrationEmailScreen";
  RegistrationEmailScreen: "RegistrationUsernameScreen";
  RegistrationUsernameScreen: "RegistrationPasswordScreen";
  RegistrationPasswordScreen: "AddProfileImageScreen";
}

export interface ScreenConstants<T extends RegisterFormScreen> {
  heading: string;
  additionalText?: string;
  inputConstants: InputConstants<RegisterFormField>;
  errorMessages: Record<ValidationResultsMap[T], string>;
  nextScreen: NextScreenMap[T];
}

export type RegisterScreenConstants = {
  [K in RegisterFormScreen]: ScreenConstants<K>;
};

// TODO: Move below types to appropriate new file
export type PostRestaurant = {
  _id: string;
  name: string;
};

export type OtherPerson = {
  _id: string;
  name: string;
  profileImageURL: string;
};

// TODO Rename restaurant ID to 'restaurant', as we're populating this field
// TODO - now disagree with the above - the raw field in the document is the ID, not the restaurant itself

export type Post = {
  _id: string;
  author: string;
  restaurant: PostRestaurant;
  ratings: number[];
  imageURLs: string[];
  timestamp: Date;
  title: string;
  text: string;
  others: OtherPerson[];
  authorName: string;
  authorprofileImageURL: string;
};

export type CompleteUserDocument = {
  _id: string;
  email: string;
  // passwordHash: string;
  name: string;
  username: string;
  profileImageURL: string;
  // TODO: consider using virtuals and an intermediary collection for many-many following / followers relationship
  following: string[];
  followers: string[];
};

export type LoginCredentials = {
  usernameOrEmail: string;
  password: string;
};

export type NewUserCredentials = {
  email: string;
  name: string;
  username: string;
  password: string;
};

export type NewPost = {
  authorID: string;
  restaurant: string;
  imageURLs: string[];
  ratings: number[];
  title: string;
  text: string;
  others: string[];
  timestamp: Date | undefined;
};

export type formTextFields = "restaurantName" | "title" | "text";
export type formRatingFields = "food" | "vibes" | "value";
