import React, { useCallback, useContext, useState } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";

import styles from "./LoginStyles";
import logo from "../../assets/logo.png";
import colors from "../../colors";
import BottomTab from "../../components/BottomTab/BottomTab";
import { loginUser } from "../../services/api/apiClient";
import { FailedRequestError } from "../../services/api/APIUtils";
import { setJWT, setUserID } from "../../services/deviceStorageClient";
import { LoginCredentials } from "../../types";
import { StackScreenProps } from "../../Types/NavigationTypes";
import { LoginUserResponse } from "../../Types/APIResponseTypes";
import { useInputFocusTracker } from "../../utils/customHooks";
import { loginScreenConstants } from "../../constants/constants";
import CredentialTextInput from "../../components/CredentialTextInput/CredentialTextInput";
import { AuthContext } from "../../utils/appContext";

const Login = ({
  navigation
}: {
  navigation: StackScreenProps<"Login">["navigation"];
}) => {
  const setAuthData = useContext(AuthContext)[1];

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

  const [disableButton, setDisableButton] = useState(false);

  const [requestErrorCause, setRequestErrorCause] = useState<
    Record<"invalidCredentials" | "applicationError", boolean>
  >({
    invalidCredentials: false,
    applicationError: false
  });

  const { mutate, isError, error } = useMutation(loginUser, {
    retry: false,
    onSuccess: (data) => handleLogin(data).catch(() => setDisableButton(false)),
    onError: () => setDisableButton(false)
  });

  const isFocusedOnInput = useInputFocusTracker();

  const handleLogin = useCallback(async (responseBody: LoginUserResponse) => {
    const [jwt, userID] = [responseBody.data.token, responseBody.data.userID];
    await Promise.all([setJWT(jwt), setUserID(userID)]);
    setAuthData({
      jwt,
      userID,
      status: "success"
    });
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Feed",
          params: {
            feedUserInfo: ""
          }
        }
      ]
    });

    //   dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [
    //         {
    //           name: "Feed",
    //           params: {
    //             feedUserInfo: ""
    //           }
    //         }
    //       ]
    //     })
    //   );
  }, []);

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
          styles.loginButton,
          { opacity: disableButton ? 0.5 : 1 }
          // { marginTop: isFocusedOnInput ? 20 : 20 }
        ]}
        disabled={disableButton}
        activeOpacity={0.5}
        onPress={() => {
          if (Object.values(loginCredentials).includes("")) {
            const highlightInputEntries = Object.entries(loginCredentials).map(
              ([field, value]) => [field, value === "" ? true : false]
            );
            setHighlightInput(Object.fromEntries(highlightInputEntries));
          } else {
            setDisableButton(true);
            mutate(loginCredentials);
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
