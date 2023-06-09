// import { StackScreenProps } from "@react-navigation/stack";
// import { StackNavigationProp } from "@react-navigation/stack";

// Form Types

export type LoginFormField = "usernameOrEmail" | "password";
export type RegisterFormField = "email" | "name" | "username" | "password";

type FormAction<T extends LoginFormField | RegisterFormField> =
  | {
      type: "highlight_fields";
      fields: T[];
    }
  | {
      type: "focus_field";
      field: T;
    }
  | {
      type: "blur_field";
      field: T;
    }
  | {
      type: "update_and_validate_field";
      field: T;
      value: string;
    };

export type LoginFormAction = FormAction<LoginFormField>;
export type RegisterFormAction = FormAction<RegisterFormField>;

type FormState<T extends string> = Record<
  T,
  {
    value: string;
    valid: boolean;
    highlight: boolean;
    focused: boolean;
  }
>;

export type RegisterFormState = FormState<RegisterFormField>;
export type LoginFormState = FormState<LoginFormField>;

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

// Util types

// Only to be used when certain no excess properties are present in object
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
