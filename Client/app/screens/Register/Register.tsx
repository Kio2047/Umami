import React, { useCallback, useReducer, useState } from "react";
import {
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./RegisterStyles";
import logo from "../../assets/logo.png";
import { StackScreenProps } from "../../Types/NavigationTypes";
import { NewUserCredentials } from "../../Types/CredentialFormTypes";
import { Entries } from "../../Types/UtilTypes";
import { registrationInputConstants } from "../../constants/registrationConstants";
import BottomTab from "../../components/BottomTab/BottomTab";
import { useInputFocusTracker } from "../../hooks/useInputFocusTracker";
import { createNewUser } from "../../services/api/apiClient";
import { useMutation } from "@tanstack/react-query";
import CredentialTextInput from "../../components/CredentialTextInput/CredentialTextInput";
import { CreateNewUserResponse } from "../../Types/APIResponseTypes";
import { setJWT, setUserID } from "../../services/deviceStorageClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { initialState, reducer } from "./formStateReducer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import BackgroundImage from "../../components/ScreenBackground/ScreenBackground";

const Register = ({
  navigation
}: {
  navigation: StackScreenProps<"Register">["navigation"];
}) => {
  const setAuthData = useAuthContext()[1];
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [disableButton, setDisableButton] = useState(false);
  const isFocusedOnInput = useInputFocusTracker();

  const { mutate, isError, error } = useMutation(createNewUser, {
    retry: false,
    onSuccess: (data) =>
      handleSignup(data).catch(() => setDisableButton(false)),
    onError: () => setDisableButton(false)
  });

  const handleSignup = useCallback(
    async (responseBody: CreateNewUserResponse) => {
      const [jwt, userID] = [
        responseBody.data.token,
        responseBody.data.createdAccount._id
      ];
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
            name: "AddProfileImage",
            params: {
              newUserName: responseBody.data.createdAccount.name
            }
          }
        ]
      });
    },
    []
  );

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputList}>
            {registrationInputConstants.map((formFieldConstants) => (
              <CredentialTextInput
                key={formFieldConstants.formField}
                formFieldState={formState[formFieldConstants.formField]}
                stateActionDispatcher={dispatch}
                formField={formFieldConstants.formField}
                secureTextEntry={formFieldConstants.secureTextEntry}
                keyboardType={formFieldConstants.keyboardType}
                placeholder={formFieldConstants.placeholder}
                errorText={formFieldConstants.errorText}
              />
            ))}
          </View>
          {/* TODO: make the displayed text change with the focused textinput (e.g., when focused on username box state permitted characters) */}
          {/* {isFocusedOnInput && (
          <Text
            style={[
              styles.passwordStrengthText,
              { color: showPasswordReqs ? colors.primaryFontColor : "#000000" }
            ]}
          >
            Password must include:{"\n"}• one number {"\n"}• one special
            character
          </Text>
        )} */}
          <TouchableOpacity
            style={[
              styles.signUpButton,
              { opacity: disableButton ? 0.5 : 1 }
              // { marginBottom: isFocusedOnInput ? 10 : undefined }
              // { marginTop: isFocusedOnInput ? 40 : 20 }
            ]}
            disabled={disableButton}
            activeOpacity={0.5}
            onPress={() => {
              const emptyFields = Object.entries(formState).filter(
                ([field, properties]) => properties.value === ""
              ) as Entries<typeof formState>;
              if (emptyFields.length !== 0) {
                dispatch({
                  type: "highlight_fields",
                  fields: emptyFields.map(([field, properties]) => field)
                });
                return;
              }
              const formValid = Object.values(formState).every(
                (field) => field.valid
              );
              if (formValid) {
                setDisableButton(true);
                // let formFieldValues:
                const newUserCredentials = (
                  Object.entries(formState) as Entries<typeof formState>
                ).reduce(
                  (accumulator, [field, properties]) => {
                    accumulator[field] = properties.value;
                    return accumulator;
                  },
                  {} as Record<keyof typeof formState, string>
                );
                mutate(newUserCredentials);
              } else {
                if (!formState.password.valid) {
                  dispatch({
                    type: "highlight_fields",
                    fields: ["password"]
                  });
                }
                //TODO: highlight other fields if invalid
              }
            }}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <BottomTab
          message="Already have an account? Sign in&nbsp;"
          navigation={navigation}
          navigateTo="Login"
        />
      </SafeAreaView>
    </Pressable>
  );
};

export default Register;
