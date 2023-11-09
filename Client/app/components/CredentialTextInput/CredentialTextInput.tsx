import React from "react";
import { KeyboardTypeOptions, TextInput, Text, Keyboard } from "react-native";

import styles from "./CredentialTextInputStyles";
import {
  LoginFormField,
  RegisterFormField,
  FormAction,
  FormFieldState
} from "../../Types/SharedTypes";
import colors from "../../colors";

const getPlaceholderText = (field: string, placeholder?: string) =>
  placeholder ?? field.charAt(0).toUpperCase() + field.substring(1);

interface CredentialTextInputProps<
  T extends LoginFormField | RegisterFormField
> {
  stateActionDispatcher: React.Dispatch<FormAction<T>>;
  formFieldState: FormFieldState;
  formField: T;
  aidText?: string;
  errorText?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const CredentialTextInput = <T extends LoginFormField | RegisterFormField>({
  stateActionDispatcher,
  formFieldState,
  formField,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false
}: CredentialTextInputProps<T>) => {
  const placeholderText = getPlaceholderText(formField, placeholder);

  const inputStyle = [
    styles.input,
    formFieldState.focused && styles.focusedInput,
    formFieldState.highlight && styles.highlightedInput
  ];
  const placeholderTextColor = formFieldState.highlight
    ? colors.fieldHighlightedPlaceholderColor
    : formFieldState.focused
    ? colors.fieldFocusedPlaceholderColor
    : colors.fieldPlaceholderColor;

  const changeTextHandler = (text: string) => {
    stateActionDispatcher({
      type: "update_and_validate_field",
      field: formField,
      value: text
    });
  };

  const focusHandler = () => {
    stateActionDispatcher({
      type: "focus_field",
      field: formField
    });
  };

  const blurHandler = () =>
    stateActionDispatcher({
      type: "blur_field",
      field: formField
    });

  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholderText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onChangeText={changeTextHandler}
      onFocus={focusHandler}
      onBlur={blurHandler}
      onSubmitEditing={Keyboard.dismiss}
    />
  );
};

export default CredentialTextInput;
