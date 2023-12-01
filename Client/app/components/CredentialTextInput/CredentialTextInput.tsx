import React, { useEffect, useRef } from "react";
import {
  Animated,
  KeyboardTypeOptions,
  TextInput,
  Text,
  Keyboard,
  View,
  Pressable,
  Easing
} from "react-native";

import styles from "./CredentialTextInputStyles";
import {
  LoginFormField,
  RegisterFormField,
  FormAction,
  FormFieldState
} from "../../Types/CredentialFormTypes";
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
  const placeholderAnimationValue = useRef(
    new Animated.Value(formFieldState.value ? 1 : 0)
  ).current;
  useEffect(() => {
    Animated.timing(placeholderAnimationValue, {
      toValue: formFieldState.focused || formFieldState.value ? 1 : 0,
      duration: 150,
      easing: Easing.inOut(Easing.ease), // Apply the easing function here
      useNativeDriver: false
    }).start();
  }, [formFieldState.focused, formFieldState.value]);
  const animatedStyle = {
    top: placeholderAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 5]
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
    formFieldState.highlight && styles.highlightedPressable
  ];
  // const placeholderTextColor = formFieldState.highlight
  //   ? colors.fieldHighlightedPlaceholderColor
  //   : formFieldState.focused
  //   ? colors.fieldFocusedPlaceholderColor
  //   : colors.fieldPlaceholderColor;

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
    <View style={styles.container}>
      <Pressable
        style={pressableStyle}
        onPress={() => textInputRef.current?.focus()}
      >
        <Animated.Text style={[styles.placeholder, animatedStyle]}>
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
        />
      </Pressable>
    </View>
  );
};

export default CredentialTextInput;
