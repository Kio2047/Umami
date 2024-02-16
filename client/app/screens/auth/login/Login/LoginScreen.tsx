import React, { useCallback, useContext, useReducer, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";

import styles from "./LoginScreen.styles";
import logo from "../../../../assets/images/logo-transparent.png";
import BottomTab from "../../../../components/BottomTab/BottomTab";
import { loginUser } from "../../../../services/api/apiClient";
import { FailedRequestError } from "../../../../services/api/apiUtils";
import { setJWT, setUserID } from "../../../../services/deviceStorageClient";
import { LoginCredentials } from "../../../../types/CredentialFormTypes";
import { Entries } from "../../../../types/UtilTypes";
import { StackScreenProps } from "../../../../types/NavigationTypes";
import { LoginUserResponse } from "../../../../types/APIResponseTypes";
import { useInputFocusTracker } from "../../../../hooks/useInputFocusTracker";
import { loginInputConstants } from "../../../../constants/loginConstants";
import CredentialTextInput from "../../../../components/CredentialTextInput/CredentialTextInput";
import { initialState, reducer } from "./loginFormStateReducer";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const Login = ({
  navigation
}: {
  navigation: StackScreenProps<"Login">["navigation"];
}) => {
  const setAuthData = useAuthContext()[1];
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [disableButton, setDisableButton] = useState(false);
  const isFocusedOnInput = useInputFocusTracker();

  const { mutate, isError, error } = useMutation(loginUser, {
    retry: false,
    onSuccess: (data) => handleLogin(data).catch(() => setDisableButton(false)),
    onError: () => {
      console.log(error);
      setDisableButton(false);
    }
  });

  // const [requestErrorCause, setRequestErrorCause] = useState<
  //   Record<"invalidCredentials" | "applicationError", boolean>
  // >({
  //   invalidCredentials: false,
  //   applicationError: false
  // });

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
  }, []);

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
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
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
        {loginFormConstants.map((formFieldConstants) => {
          return (
            <CredentialTextInput
              key={formFieldConstants.formField}
              formFieldState={formState[formFieldConstants.formField]}
              stateActionDispatcher={dispatch}
              formField={formFieldConstants.formField}
              secureTextEntry={formFieldConstants.secureTextEntry}
              keyboardType={formFieldConstants.keyboardType}
              placeholder={formFieldConstants.placeholder}
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
            { opacity: disableButton ? 0.5 : 1 },
            { marginTop: isFocusedOnInput ? 10 : 20 }
          ]}
          disabled={disableButton}
          activeOpacity={0.5}
          onPress={() => {
            const emptyFields = Object.entries(formFieldState).filter(
              ([field, properties]) => properties.value === ""
            ) as Entries<typeof formFieldState>;
            if (emptyFields.length !== 0) {
              dispatch({
                type: "highlight_fields",
                fields: emptyFields.map(([field, properties]) => field)
              });
              return;
            }
            const formValid = Object.values(formFieldState).every(
              (field) => field.valid
            );
            if (formValid) {
              setDisableButton(true);
              const userCredentials = (
                Object.entries(formFieldState) as Entries<typeof formFieldState>
              ).reduce(
                (accumulator, [field, properties]) => {
                  accumulator[field] = properties.value;
                  return accumulator;
                },
                {} as Record<keyof typeof formFieldState, string>
              );
              mutate(userCredentials);
            } else {
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
    </Pressable>
  );
};

export default Login;
