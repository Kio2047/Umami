import React from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";

import styles from "./CredentialTextInputStyles";
import {
  RegisterFormAction,
  LoginFormAction,
  LoginFormField,
  RegisterFormField
} from "../../Types/SharedTypes";
import colors from "../../colors";

interface CredentialTextInputProps<
  T extends LoginFormAction | RegisterFormAction
> {
  formActionDispatcher: React.Dispatch<T>;
  formField: T extends LoginFormAction ? LoginFormField : RegisterFormField;
  highlightInput: boolean;
  secureTextEntry?: true;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}

const CredentialTextInput = <T extends LoginFormAction | RegisterFormAction>({
  formActionDispatcher,
  formField,
  highlightInput,
  secureTextEntry,
  keyboardType,
  placeholder
}: CredentialTextInputProps<T>) => {
  return (
    <TextInput
      style={highlightInput ? styles.highlightedInput : styles.input}
      placeholderTextColor={
        highlightInput
          ? colors.formHighlightedBorderColor
          : colors.formPlaceholderColor
      }
      placeholder={
        placeholder ??
        formField.charAt(0).toUpperCase() + formField.substring(1)
      }
      key={formField}
      keyboardType={keyboardType ?? "default"}
      secureTextEntry={secureTextEntry ?? false}
      onChangeText={(text: string) => {
        formActionDispatcher({
          type: "update_and_validate_field",
          field: formField
          // TODO: get TS to infer this as to avoid casting
        } as T);
      }}
      onFocus={() => {
        formActionDispatcher({
          type: "focus_field",
          field: formField
          // TODO: get TS to infer this as to avoid casting
        } as T);
      }}
      onBlur={() =>
        formActionDispatcher({
          type: "blur_field",
          field: formField
          // TODO: get TS to infer this as to avoid casting
        } as T)
      }
    />
  );
};

export default CredentialTextInput;
