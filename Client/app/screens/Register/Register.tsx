import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./RegisterStyles";
import logo from "../../assets/logo.png";
import { StackScreenProps } from "../../Types/NavigationTypes";
import { NewUserCredentials } from "../../types";
import colors from "../../colors";
import { registerScreenConstants } from "../../constants/constants";
import BottomTab from "../../components/BottomTab/BottomTab";
import { useInputFocusTracker } from "../../utils/customHooks";
import { createNewUser } from "../../services/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const Register = ({
  navigation
}: {
  navigation: StackScreenProps<"Register">["navigation"];
}) => {
  const [newUserCredentials, setNewUserCredentials] =
    useState<NewUserCredentials>({
      email: "",
      name: "",
      username: "",
      password: ""
    });
  const { refetch, isFetching, isError, isSuccess, error, data } = useQuery(
    ["sessionToken", newUserCredentials],
    createNewUser,
    {
      enabled: false,
      retry: false
    }
  );
  const textInputChangeHandler = useCallback(
    (formField: keyof NewUserCredentials) => (text: string) => {
      setNewUserCredentials((state) => ({
        ...state,
        [formField]: text
      }));
    },
    []
  );
  const isFocusedOnInput = useInputFocusTracker();

  return (
    <SafeAreaView style={styles.container}>
      {!isFocusedOnInput && (
        <Image style={styles.logo} source={logo} resizeMode="contain" />
      )}

      {registerScreenConstants.inputConstants.map((formFieldConstants) => {
        return (
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.formPlaceholderColor}
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
          />
        );
      })}
      <TouchableOpacity
        style={[
          styles.signUpButton
          // { marginTop: isFocusedOnInput ? 20 : 20 }
        ]}
        disabled={isFetching ? true : false}
        activeOpacity={0.5}
        onPress={() => {
          if (Object.values(newUserCredentials).includes("")) {
            // tell them to fill in empty field
            return;
          }
          refetch();
        }}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      {!isFocusedOnInput && (
        <BottomTab
          message="Already have an account? Sign in&nbsp;"
          navigation={navigation}
          navigateTo="Login"
        />
      )}
    </SafeAreaView>
  );
};

export default Register;
