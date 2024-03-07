import { KeyboardTypeOptions } from "react-native";
import { LoginField } from "./LoginTypes";
import { RegisterField } from "./RegisterTypes";
import { CreatedAccount } from "../APIResponseTypes";

export interface FieldState {
  value: string;
  valid: boolean;
  highlight: boolean;
  focused: boolean;
  error: boolean;
}

export type FormState<T extends LoginField | RegisterField> = Record<
  T,
  FieldState
>;

export type FormAction<T extends LoginField | RegisterField> =
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

export interface InputConstants<T extends LoginField | RegisterField> {
  formField: T;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: true;
}

export type InputConstantsTypeMap<T extends LoginField | RegisterField> = {
  [K in T]: InputConstants<K>;
};

export type LocalStorageAuthData =
  | {
      jwt: null;
      // userID: null;
      status: "loading" | "unauthenticated";
    }
  | {
      jwt: string;
      // userID: null;
      status: "authenticated";
    };
// | { jwt: string; userID: string; status: "authenticated" };
// | { jwt: string; userID: CreatedAccount; status: "authenticated" };
