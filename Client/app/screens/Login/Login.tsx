import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import styles from "./LoginStyles";
import { RootStackParamList } from "../../Types/NavigationTypes";
import { UserCredentials } from "../../types";
import logo from "../../assets/logo.png";
import colors from "../../colors";
import { createSessionToken } from "../../api/apiClientService";
import { StackScreenProps } from "../../Types/NavigationTypes";
import BottomTab from "../../components/BottomTab/BottomTab";
import { FailedRequestError } from "../../api/APIUtils";

const Login = ({
  navigation
}: {
  navigation: StackScreenProps<"Login">["navigation"];
}) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: "",
    password: ""
  });
  const [requestErrorCause, setRequestErrorCause] = useState<
    Record<"invalidCredentials" | "applicationError", boolean>
  >({
    invalidCredentials: false,
    applicationError: false
  });
  const [isFocusedOnInput, setIsFocusedOnInput] = useState<boolean>(false);
  const { data, refetch, isError, error, isSuccess } = useQuery(
    ["sessionToken", userCredentials],
    createSessionToken,
    {
      enabled: false
    }
  );
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsFocusedOnInput(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsFocusedOnInput(false);
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  if (isError && error instanceof Error) {
    if (error instanceof TypeError) {
      setRequestErrorCause({
        invalidCredentials: false,
        applicationError: true
      });
    } else if (error instanceof FailedRequestError) {
      setRequestErrorCause({
        invalidCredentials: true,
        applicationError: false
      });
    }
  }
  if (isSuccess) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Feed",
            params: {
              feedUserInfo: ""
            }
          }
        ]
      })
    );
  }

  return (
    <SafeAreaView
      style={
        styles.container
        // { justifyContent: isFocusedOnInput ? "flex-start" : "center" },
        // { paddingTop: isFocusedOnInput ? 0 : 0 }
      }
    >
      {/* fadeDuration={0} */}
      <Image
        style={[styles.logo, { marginBottom: isFocusedOnInput ? 20 : 30 }]}
        source={logo}
        resizeMode="contain"
      />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={colors.formPlaceholderColor}
          // value={loginForm.email}
          keyboardType="email-address"
          onChangeText={(text) =>
            setUserCredentials((state) => ({ ...state, email: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.formPlaceholderColor}
          // value={loginForm.password}
          secureTextEntry={true}
          onChangeText={(text) =>
            setUserCredentials((state) => ({
              ...state,
              password: text
            }))
          }
        />
        {requestErrorCause.invalidCredentials && (
          <Text style={styles.loginErrorText}>Invalid login details</Text>
        )}
        {requestErrorCause.applicationError && (
          <Text style={styles.loginErrorText}>
            There was a problem trying to log you in. Please try again later
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.loginButton
            // { marginTop: isFocusedOnInput ? 20 : 20 }
          ]}
          activeOpacity={0.5}
          onPress={() => refetch()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      {!isFocusedOnInput && (
        <BottomTab
          message="Don't have an account yet? Create one&nbsp;"
          navigation={navigation}
          navigateTo="Register"
        />
      )}
    </SafeAreaView>
  );
};

export default Login;
