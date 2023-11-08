import React from "react";
import { KeyboardTypeOptions, TextInput, Text } from "react-native";

import styles from "./CredentialTextInputStyles";
import {
  LoginFormField,
  RegisterFormField,
  FormAction
} from "../../Types/SharedTypes";
import colors from "../../colors";

interface CredentialTextInputProps<
  T extends LoginFormField | RegisterFormField
> {
  formActionDispatcher: React.Dispatch<FormAction<T>>;
  formField: T;
  highlightInput: boolean;
  secureTextEntry?: true;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}

const CredentialTextInput = <T extends LoginFormField | RegisterFormField>({
  formActionDispatcher,
  formField,
  highlightInput,
  secureTextEntry,
  keyboardType,
  placeholder
}: CredentialTextInputProps<T>) => {
  return (
    <>
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
            field: formField,
            value: text
          });
        }}
        onFocus={() => {
          formActionDispatcher({
            type: "focus_field",
            field: formField
          });
        }}
        onBlur={() =>
          formActionDispatcher({
            type: "blur_field",
            field: formField
          })
        }
      />
      <Text></Text>
    </>
  );
};

export default CredentialTextInput;
