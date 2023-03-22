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
import CredentialTextInput from "../../components/CredentialTextInput/CredentialTextInput";
import { CreateNewUserResponse } from "../../Types/APIResponseTypes";
import { setJWT, setUserID } from "../../services/deviceStorageClient";

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

  const [highlightInput, setHighlightInput] = useState<{
    [k in keyof NewUserCredentials]: boolean;
  }>({
    email: false,
    name: false,
    username: false,
    password: false
  });

  const { refetch, isFetching, isError, isSuccess, error, data } = useQuery(
    ["sessionToken", newUserCredentials],
    createNewUser,
    {
      enabled: false,
      retry: false
    }
  );

  const isFocusedOnInput = useInputFocusTracker();

  const handleSignup = useCallback(
    async (responseBody: CreateNewUserResponse) => {
      await Promise.all([
        setJWT(responseBody.token),
        setUserID(responseBody.createdAccount._id)
      ]);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "AddProfilePicture",
            params: {
              newUserName: responseBody.createdAccount.name
            }
          }
        ]
      });
    },
    []
  );
  if (isSuccess) {
    handleSignup(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isFocusedOnInput && (
        <Image style={styles.logo} source={logo} resizeMode="contain" />
      )}

      {registerScreenConstants.inputConstants.map((formFieldConstants) => {
        return (
          <CredentialTextInput
            formFieldConstants={formFieldConstants}
            highlightInput={highlightInput}
            setHighlightInput={setHighlightInput}
            setCredentials={setNewUserCredentials}
            key={formFieldConstants.formField}
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
            const highlightInputEntries = Object.entries(
              newUserCredentials
            ).map(([field, value]) => [field, value === "" ? true : false]);
            setHighlightInput(Object.fromEntries(highlightInputEntries));
          } else {
            refetch();
          }
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
