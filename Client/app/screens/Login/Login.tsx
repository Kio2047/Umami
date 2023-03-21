import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import styles from "./LoginStyles";
import logo from "../../assets/logo.png";
import colors from "../../colors";
import BottomTab from "../../components/BottomTab/BottomTab";
import { loginUser } from "../../services/api/apiClient";
import { FailedRequestError } from "../../services/api/APIUtils";
import { saveJWT } from "../../services/deviceStorageClient";
import { LoginCredentials } from "../../types";
import { StackScreenProps } from "../../Types/NavigationTypes";
import { LoginUserResponse } from "../../Types/APIResponseTypes";
import { useInputFocusTracker } from "../../utils/customHooks";
import { loginScreenConstants } from "../../constants/constants";
import CredentialTextInput from "../../components/CredentialTextInput/CredentialTextInput";

const Login = ({
  navigation
}: {
  navigation: StackScreenProps<"Login">["navigation"];
}) => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    "username or email": "",
    password: ""
  });
  const [highlightInput, setHighlightInput] = useState<{
    [k in keyof LoginCredentials]: boolean;
  }>({
    "username or email": false,
    password: false
  });
  const [requestErrorCause, setRequestErrorCause] = useState<
    Record<"invalidCredentials" | "applicationError", boolean>
  >({
    invalidCredentials: false,
    applicationError: false
  });
  const { refetch, isFetching, isError, isSuccess, error, data } = useQuery(
    ["sessionToken", loginCredentials],
    loginUser,
    {
      enabled: false,
      retry: false
    }
  );

  const handleLogin = useCallback(async (responseBody: LoginUserResponse) => {
    await saveJWT(responseBody.token);
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
  }, []);

  const isFocusedOnInput = useInputFocusTracker();

  // console.log(isFetching);

  if (isError && error instanceof Error) {
    if (
      error instanceof TypeError ||
      (error instanceof FailedRequestError && error.statusClass !== "4xx")
    ) {
      if (!requestErrorCause.applicationError) {
        setRequestErrorCause({
          invalidCredentials: false,
          applicationError: true
        });
      }
    } else if (
      error instanceof FailedRequestError &&
      error.statusClass === "4xx"
    )
      if (!requestErrorCause.invalidCredentials) {
        {
          setRequestErrorCause({
            invalidCredentials: true,
            applicationError: false
          });
        }
      }
  }

  if (isSuccess) {
    handleLogin(data);
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
      {loginScreenConstants.inputConstants.map((formFieldConstants) => {
        return (
          <CredentialTextInput
            formFieldConstants={formFieldConstants}
            highlightInput={highlightInput}
            setHighlightInput={setHighlightInput}
            setCredentials={setLoginCredentials}
            key={formFieldConstants.formField}
          />
        );
      })}

      {requestErrorCause.invalidCredentials && (
        <Text style={styles.loginErrorText}>Invalid login details</Text>
      )}
      {requestErrorCause.applicationError && (
        <Text style={styles.loginErrorText}>
          Server issue — please try again later
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.loginButton
          // { marginTop: isFocusedOnInput ? 20 : 20 }
        ]}
        disabled={isFetching ? true : false}
        activeOpacity={0.5}
        onPress={() => {
          if (Object.values(loginCredentials).includes("")) {
            const highlightInputEntries = Object.entries(loginCredentials).map(
              ([field, value]) => [field, value === "" ? true : false]
            );
            setHighlightInput(Object.fromEntries(highlightInputEntries));
          } else {
            refetch();
          }
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
