export type LoginFormField = "usernameOrEmail" | "password";
export type RegisterFormField = "email" | "name" | "username" | "password";

export type FormFieldState = {
  value: string;
  valid: boolean;
  highlight: boolean;
  focused: boolean;
  error: boolean;
};

export type FormAction<T extends LoginFormField | RegisterFormField> =
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

export type FormState<T extends LoginFormField | RegisterFormField> = Record<
  T,
  FormFieldState
>;

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
