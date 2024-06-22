import React, { useEffect, useRef } from "react";
import {
  Text,
  Animated,
  KeyboardTypeOptions,
  TextInput,
  Keyboard,
  View,
  Pressable,
  Easing
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./CredentialTextInput.styles";
import { colors } from "../../constants/styles/styleConstants";
import { FieldState, FormAction } from "../../types/auth/CommonAuthTypes";
import { LoginField } from "../../types/auth/LoginTypes";
import { RegisterField } from "../../types/auth/RegisterTypes";

const getPlaceholderText = (field: string, placeholder?: string) =>
  placeholder ?? field.charAt(0).toUpperCase() + field.substring(1);

interface CredentialTextInputProps<T extends LoginField | RegisterField> {
  stateActionDispatcher: React.Dispatch<FormAction<T>>;
  formFieldState: FieldState;
  formField: T;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const CredentialTextInput = <T extends LoginField | RegisterField>({
  stateActionDispatcher,
  formFieldState,
  formField,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false
}: CredentialTextInputProps<T>) => {
  const placeholderAnimationValue = useRef(
    new Animated.Value(formFieldState.value ? 1 : 0)
  ).current;
  useEffect(() => {
    Animated.timing(placeholderAnimationValue, {
      toValue: formFieldState.focused || formFieldState.value ? 1 : 0,
      duration: 125,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }).start();
  }, [formFieldState.focused, formFieldState.value]);
  const animatedStyle = {
    top: placeholderAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [19, 5]
    }),
    fontSize: placeholderAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 10]
    }),
    color: placeholderAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        colors.fieldPlaceholderColor,
        colors.fieldFocusedPlaceholderColor
      ]
    })
  };

  const textInputRef = useRef<TextInput | null>(null);

  const placeholderText = getPlaceholderText(formField, placeholder);

  const pressableStyle = [
    styles.pressable,
    formFieldState.focused && styles.focusedPressable,
    !formFieldState.valid && styles.invalidPressable
    // formFieldState.highlight && styles.highlightedPressable
  ];
  // const placeholderTextColor = formFieldState.highlight
  //   ? colors.fieldHighlightedPlaceholderColor
  //   : formFieldState.focused
  //   ? colors.fieldFocusedPlaceholderColor
  //   : colors.fieldPlaceholderColor;

  const changeTextHandler = (text: string) => {
    stateActionDispatcher({
      // type: "update_and_validate_field",
      type: "update_field",
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

  const blurHandler = () => {
    stateActionDispatcher({
      type: "blur_field",
      field: formField
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={pressableStyle}
        onPress={() => textInputRef.current?.focus()}
      >
        <Animated.Text
          style={[
            styles.placeholder,
            animatedStyle,
            !formFieldState.valid && { color: colors.errorColor }
          ]}
        >
          {placeholderText}
        </Animated.Text>
        <TextInput
          ref={textInputRef}
          style={styles.input}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={changeTextHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onSubmitEditing={Keyboard.dismiss}
          value={formFieldState.value}
        />
        {!formFieldState.valid ? (
          <MaterialIcons
            style={styles.inputIcon}
            name="error-outline"
            size={28}
            color={colors.errorColor}
          />
        ) : (
          formFieldState.value && (
            <Pressable
              style={styles.inputIcon}
              onPress={() => {
                changeTextHandler("");
              }}
            >
              <MaterialIcons
                name="clear"
                size={24}
                color={colors.fieldFocusedBorderColor}
              />
            </Pressable>
          )
        )}
      </Pressable>
      {/* {errorMessages?.length && formFieldState.focused && ( */}
      {!formFieldState.valid && (
        <Text style={styles.invalidText}>{formFieldState.invalidMessage}</Text>
      )}
    </View>
  );
};

export default CredentialTextInput;
