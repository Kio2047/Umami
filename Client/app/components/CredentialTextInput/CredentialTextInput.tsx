import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from "react-native";

import styles from "./CredentialTextInputStyles";
import { LoginCredentials, NewUserCredentials } from "../../types";
import colors from "../../colors";
import { InputConstants } from "../../constants/constants";

interface CredentialTextInputProps<
  T extends LoginCredentials | NewUserCredentials
> {
  formFieldConstants: InputConstants<T>;
  highlightInput: {
    [k in keyof T]: boolean;
  };
  setHighlightInput: React.Dispatch<
    React.SetStateAction<{
      [k in keyof T]: boolean;
    }>
  >;
  setCredentials: React.Dispatch<React.SetStateAction<T>>;
  innerOnFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  innerOnBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const CredentialTextInput = <T extends LoginCredentials | NewUserCredentials>({
  formFieldConstants,
  highlightInput,
  setHighlightInput,
  setCredentials,
  innerOnFocus,
  innerOnBlur
}: CredentialTextInputProps<T>) => {
  const textInputChangeHandler = useCallback(
    (formField: keyof T) => (text: string) => {
      if (highlightInput[formField]) {
        setHighlightInput((state) => ({
          ...state,
          [formField]: false
        }));
      }
      setCredentials((state) => ({
        ...state,
        [formField]: text
      }));
    },
    [highlightInput]
  );

  return (
    <TextInput
      style={
        highlightInput[formFieldConstants.formField]
          ? styles.highlightedInput
          : styles.input
      }
      placeholderTextColor={
        highlightInput[formFieldConstants.formField]
          ? colors.formHighlightedBorderColor
          : colors.formPlaceholderColor
      }
      placeholder={
        formFieldConstants.placeholder ??
        formFieldConstants.formField.charAt(0).toUpperCase() +
          formFieldConstants.formField.substring(1)
      }
      key={formFieldConstants.formField}
      // value={loginForm.email}
      keyboardType={formFieldConstants.keyboardType ?? "default"}
      secureTextEntry={formFieldConstants.secureTextEntry ?? false}
      onChangeText={textInputChangeHandler(formFieldConstants.formField)}
      onFocus={innerOnFocus}
      onBlur={innerOnBlur}
    />
  );
};

export default CredentialTextInput;
