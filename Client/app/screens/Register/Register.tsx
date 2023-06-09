import React, { useCallback, useContext, useReducer, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./RegisterStyles";
import logo from "../../assets/logo.png";
import { StackScreenProps } from "../../Types/NavigationTypes";
import { Entries, NewUserCredentials } from "../../Types/SharedTypes";
import colors from "../../colors";
import { registerScreenConstants } from "../../constants/constants";
import BottomTab from "../../components/BottomTab/BottomTab";
import { useInputFocusTracker } from "../../utils/customHooks";
import { createNewUser } from "../../services/api/apiClient";
import { useMutation } from "@tanstack/react-query";
import CredentialTextInput from "../../components/CredentialTextInput/CredentialTextInput";
import { CreateNewUserResponse } from "../../Types/APIResponseTypes";
import { setJWT, setUserID } from "../../services/deviceStorageClient";
import { AppContext } from "../../utils/appContext";
import { initialState, reducer } from "./formStateReducer";

const Register = ({
  navigation
}: {
  navigation: StackScreenProps<"Register">["navigation"];
}) => {
  const setAuthData = useContext(AppContext).auth[1];

  const [formFieldState, dispatch] = useReducer(reducer, initialState);

  //TODO: make is formfieldvalid a state (update with each change to textinput, and pass into passwordrequirements for props etc)

  const [disableButton, setDisableButton] = useState(false);

  const [showPasswordReqs, setShowPasswordReqs] = useState(false);

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
    <SafeAreaView style={styles.container}>
      {!isFocusedOnInput && (
        <Image style={styles.logo} source={logo} resizeMode="contain" />
      )}
      <KeyboardAvoidingView>
        {registerScreenConstants.map((formFieldConstants) => {
          return (
            <CredentialTextInput
              formFieldConstants={formFieldConstants}
              highlightInput={
                formFieldState[formFieldConstants.formField].highlight
              }
              // setHighlightInput={setHighlightInput}
              // setCredentials={setNewUserCredentials}
              formActionDispatcher={dispatch}
              key={formFieldConstants.formField}
            />
          );
        })}
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
              // let formFieldValues:
              const newUserCredentials = (
                Object.entries(formFieldState) as Entries<typeof formFieldState>
              ).reduce((accumulator, [field, properties]) => {
                accumulator[field] = properties.value;
                return accumulator;
              }, {} as Record<keyof typeof formFieldState, string>);
              mutate(newUserCredentials);
            } else {
              if (!formFieldState.password.valid) {
                dispatch({ type: "highlight_fields", fields: ["password"] });
              }
              //TODO: highlight other fields if invalid
            }
          }}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
