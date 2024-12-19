import { KeyboardTypeOptions } from "react-native";
import { LoginField } from "./LoginTypes";
import { RegisterField } from "./RegisterTypes";
import { CreatedAccount } from "../APIResponseTypes";

export interface FieldState {
  value: string;
  valid: boolean;
  focused: boolean;
  invalidMessage: string;
}

export type FormState<T extends LoginField | RegisterField> = Record<
  T,
  FieldState
>;

export type FormAction<T extends LoginField | RegisterField> =
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
    }
  | {
      type: "add_invalid_warning";
      field: T;
      invalidMessage: string;
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

export type AuthState =
  | {
      jwt: null;
      status: "loading" | "unauthenticated";
    }
  | {
      jwt: string;
      status: "authenticated";
    };
