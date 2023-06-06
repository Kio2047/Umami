import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
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
import { useMutation, useQuery } from "@tanstack/react-query";
import CredentialTextInput from "../../components/CredentialTextInput/CredentialTextInput";
import { CreateNewUserResponse } from "../../Types/APIResponseTypes";
import { setJWT, setUserID } from "../../services/deviceStorageClient";
import { AppContext } from "../../utils/appContext";

const Register = ({
  navigation
}: {
  navigation: StackScreenProps<"Register">["navigation"];
}) => {
  const setAuthData = useContext(AppContext).auth[1];

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
        {registerScreenConstants.inputConstants.map(
          (formFieldConstants, index) => {
            return (
              <CredentialTextInput
                formFieldConstants={formFieldConstants}
                highlightInput={highlightInput}
                setHighlightInput={setHighlightInput}
                setCredentials={setNewUserCredentials}
                key={formFieldConstants.formField}
                innerOnFocus={
                  index === 3 ? () => setShowPasswordReqs(true) : undefined
                }
                innerOnBlur={
                  index === 3 ? () => setShowPasswordReqs(false) : undefined
                }
              />
            );
          }
        )}
        {isFocusedOnInput && (
          <Text
            style={[
              styles.passwordStrengthText,
              { color: showPasswordReqs ? colors.primaryFontColor : "#000000" }
            ]}
          >
            Password must include:{"\n"}• one number {"\n"}• one special
            character
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.signUpButton,
            { opacity: disableButton ? 0.5 : 1 },
            { marginBottom: isFocusedOnInput ? 10 : undefined }
            // { marginTop: isFocusedOnInput ? 40 : 20 }
          ]}
          disabled={disableButton}
          activeOpacity={0.5}
          onPress={() => {
            if (Object.values(newUserCredentials).includes("")) {
              const highlightInputEntries = Object.entries(
                newUserCredentials
              ).map(([field, value]) => [field, value === "" ? true : false]);
              setHighlightInput(Object.fromEntries(highlightInputEntries));
            } else if (
              !/[0-9]/.test(newUserCredentials.password) ||
              !/[^A-Za-z0-9]/.test(newUserCredentials.password)
            ) {
              setHighlightInput({ ...highlightInput, password: true });
            } else {
              setDisableButton(true);
              mutate(newUserCredentials);
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
