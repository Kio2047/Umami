import React, { useEffect, useState } from "react";
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

const Register = ({
  navigation
}: {
  navigation: StackScreenProps<"Register">["navigation"];
}) => {
  const [newUserCredentials, setNewUserCredentials] =
    useState<NewUserCredentials>({
      email: "string",
      name: "string",
      username: "string",
      password: "string"
    });
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
              formFieldConstants.field.charAt(0).toUpperCase() +
                formFieldConstants.field.substring(1)
            }
            key={formFieldConstants.field}
            // value={loginForm.email}
            keyboardType={formFieldConstants.keyboardType ?? "default"}
            secureTextEntry={formFieldConstants.secureTextEntry ?? false}
            onChangeText={(text) =>
              setNewUserCredentials((state) => ({
                ...state,
                [formFieldConstants.field]: text
              }))
            }
          />
        );
      })}
      <TouchableOpacity
        style={[
          styles.signUpButton
          // { marginTop: isFocusedOnInput ? 20 : 20 }
        ]}
        // disabled={isLoading ? true : false}
        activeOpacity={0.5}
        //   onPress={() => {
        //     let preventFetch = false;
        //     if (!loginCredentials.identity) {
        //       preventFetch = true;
        //     }
        //     if (!loginCredentials.password) {
        //       preventFetch = true;
        //     }
        //     if (preventFetch) return;
        //     refetch();
        //   }}
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
