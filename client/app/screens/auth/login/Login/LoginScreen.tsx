import React, { useCallback, useContext, useReducer, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { StackNavigationProp } from "@react-navigation/stack";

import styles from "./LoginScreen.styles";
import logo from "../../../../assets/images/logo-transparent.png";
import BottomTab from "../../../../components/BottomTab/BottomTab";
import { loginUser } from "../../../../services/api/apiClient";
import { Entries } from "../../../../types/UtilTypes";
import { AuthStackParamList } from "../../../../types/NavigationTypes";
import { useInputFocusTracker } from "../../../../hooks/useInputFocusTracker";
import { loginScreenConstants } from "../../../../constants/auth/loginConstants";
import CredentialTextInput from "../../../../components/CredentialTextInput/CredentialTextInput";
import useAuth from "../../../../contexts/AuthContext/useAuth";
import { initialState, reducer } from "./loginFormStateReducer";
import useUser from "../../../../contexts/UserContext/useUser";
import { LoginField } from "../../../../types/auth/LoginTypes";
import { loginFormValidators } from "../../../../utils/authFormValidators";
import { FailedRequestError } from "../../../../services/api/apiUtils";
import ErrorModal from "../../../../components/ErrorModal/ErrorModal";

const LoginScreen = ({
  navigation
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) => {
  const { inputConstants, errorMessages } = loginScreenConstants;

  const {
    utilities: { login }
  } = useAuth();

  const {
    utilities: { initialiseUser }
  } = useUser();

  const [formState, dispatch] = useReducer(reducer, initialState);
  const [disableButton, setDisableButton] = useState(false);
  const isFocusedOnInput = useInputFocusTracker();

  const { mutate, isError, error, reset } = useMutation(loginUser, {
    retry: false,
    onSuccess: async (data) => {
      try {
        const { token, user } = data.data;
        await Promise.all([login(token), initialiseUser(user)]);
      } catch (err) {
        console.error(err);
        setDisableButton(false);
      }
    },
    onError: (err) => {
      console.error(err);
      setDisableButton(false);
    }
  });

  const loginButtonOnPressHandler = () => {
    Keyboard.dismiss();
    reset();
    const invalidFields: LoginField[] = [];
    const invalidMessages: string[] = [];
    for (const [field, state] of Object.entries(formState) as Entries<
      typeof formState
    >) {
      const validationStatus = loginFormValidators[field](state.value);
      if (validationStatus !== 0) {
        invalidFields.push(field);
        invalidMessages.push(errorMessages[field][validationStatus]);
      }
    }
    // Ensure compatibility with expected tuple type of dispatch action
    if (invalidFields.length !== invalidMessages.length)
      throw new Error("Invalid login form state: arrays differ in length.");
    switch (invalidFields.length) {
      case 1: {
        dispatch({
          type: "add_invalid_warning",
          fields: [invalidFields[0]],
          invalidMessages: [invalidMessages[0]]
        });
        break;
      }
      case 2: {
        dispatch({
          type: "add_invalid_warning",
          fields: [invalidFields[0], invalidFields[1]],
          invalidMessages: [invalidMessages[0], invalidMessages[1]]
        });
        break;
      }
      case 0: {
        setDisableButton(true);
        const userCredentials = (
          Object.entries(formState) as Entries<typeof formState>
        ).reduce(
          (accumulator, [field, properties]) => {
            if (accumulator[field] !== "")
              throw new Error(
                "Invalid form state: unknown or duplicate field present"
              );
            accumulator[field] = properties.value;
            return accumulator;
          },
          {
            usernameOrEmail: "",
            password: ""
          }
        );
        mutate(userCredentials);
        break;
      }
      default:
        throw new Error("Invalid login form state: length must be 0, 1, or 2.");
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.pressableWrapper}>
      <SafeAreaView
        style={[
          styles.container,
          // { justifyContent: isFocusedOnInput ? "flex-start" : "center" },
          { paddingTop: isFocusedOnInput ? 120 : 60 }
        ]}
      >
        {/* fadeDuration={0} */}
        {!isFocusedOnInput && (
          <Image style={styles.logo} source={logo} resizeMode="contain" />
        )}
        <CredentialTextInput<LoginField>
          stateActionDispatcher={dispatch}
          formFieldState={formState.usernameOrEmail}
          {...inputConstants.usernameOrEmail}
        />
        <CredentialTextInput<LoginField>
          stateActionDispatcher={dispatch}
          formFieldState={formState.password}
          {...inputConstants.password}
        />
        <ErrorModal
          isVisible={
            isError &&
            error instanceof FailedRequestError &&
            error.statusClass?.[0] === "4"
          }
          errorType="user"
          title="Account not found"
          body="We can't seem to find an account that matches those details. Please double check your credentials and try again!"
          reset={reset}
        />
        <ErrorModal
          isVisible={
            isError &&
            !(
              error instanceof FailedRequestError &&
              error.statusClass?.[0] === "4"
            )
          }
          errorType="app"
          title="Application error"
          body="Looks like we're having some trouble at the moment. Please try logging in again"
          reset={reset}
        />

        <TouchableOpacity
          style={[
            styles.loginButton,
            { opacity: disableButton ? 0.5 : 1 },
            { marginTop: isFocusedOnInput ? 10 : 20 }
          ]}
          disabled={disableButton}
          activeOpacity={0.5}
          onPress={loginButtonOnPressHandler}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {!isFocusedOnInput && (
          <BottomTab
            message="Don't have an account yet? Create one&nbsp;"
            navigation={navigation}
            navigateTo="RegisterFullNameScreen"
          />
        )}
      </SafeAreaView>
    </Pressable>
  );
};

export default LoginScreen;
