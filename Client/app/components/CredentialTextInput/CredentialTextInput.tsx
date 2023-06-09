import React from "react";
import { TextInput } from "react-native";

import styles from "./CredentialTextInputStyles";
import {
  RegisterFormAction,
  LoginFormAction,
  LoginCredentials,
  NewUserCredentials
} from "../../Types/SharedTypes";
import colors from "../../colors";
import { InputConstants } from "../../constants/constants";

interface CredentialTextInputProps<
  T extends LoginFormAction | RegisterFormAction
> {
  formActionDispatcher: React.Dispatch<T>;
  formFieldConstants: InputConstants<
    T extends LoginFormAction ? LoginCredentials : NewUserCredentials
  >;
  highlightInput: boolean;
}

const CredentialTextInput = <T extends LoginFormAction | RegisterFormAction>({
  formFieldConstants,
  highlightInput,

  formActionDispatcher
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
        formFieldConstants.placeholder ??
        formFieldConstants.formField.charAt(0).toUpperCase() +
          formFieldConstants.formField.substring(1)
      }
      key={formFieldConstants.formField}
      // value={loginForm.email}
      keyboardType={formFieldConstants.keyboardType ?? "default"}
      secureTextEntry={formFieldConstants.secureTextEntry ?? false}
      onChangeText={(text: string) => {
        // if (formFieldConstants)
        formActionDispatcher({
          type: "update_and_validate_field",
          field: formFieldConstants.formField
          // TODO: get TS to infer this as to avoid casting
        } as T);
      }}
      onFocus={() => {
        formActionDispatcher({
          type: "focus_field",
          field: formFieldConstants.formField
          // TODO: get TS to infer this as to avoid casting
        } as T);
      }}
      onBlur={() =>
        formActionDispatcher({
          type: "blur_field",
          field: formFieldConstants.formField
          // TODO: get TS to infer this as to avoid c asting
        } as T)
      }
    />
  );
};

export default CredentialTextInput;
