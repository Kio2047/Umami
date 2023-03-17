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
import { LoginScreenProps, UserCredentials } from "../../types";
import logo from "../../assets/logo.png";
import colors from "../../colors";
import { createSessionToken } from "../../api/apiClientService";
// import { useRef } from "react";

const Login = ({ navigation }: LoginScreenProps) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: "",
    password: ""
  });
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { data, refetch, isError, error } = useQuery(
    ["sessionToken", userCredentials],
    createSessionToken,
    {
      enabled: false
    }
  );
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsFocused(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsFocused(false);
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);
  // const [emailInput, passwordInput] = [
  //   useRef<TextInput>(null),
  //   useRef<TextInput>(null)
  // ];

  // const inputChangeHandler = (
  //   event: NativeSyntheticEvent<TextInputChangeEventData>,
  //   field: string
  // ): void => {
  //   setLoginForm({
  //     ...loginForm,
  //     [field]: event.nativeEvent.text
  //   });
  // };

  // const submitCredentialsHandler = () => {
  //   setUserCredentials({
  //     email: emailInput.current._lastNativetext
  //   });
  //   refetch();
  // };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { justifyContent: isFocused ? "flex-start" : "center" },
        { paddingTop: isFocused ? 10 : 0 }
      ]}
    >
      {/* fadeDuration={0} */}
      <Image
        style={[styles.logo, { marginBottom: isFocused ? 20 : 30 }]}
        source={logo}
        resizeMode="contain"
      />
      <View>
        <TextInput
          style={styles.input}
          // ref={emailInput}
          placeholder="Email address"
          // placeholder="Email address"
          placeholderTextColor={colors.formPlaceholderColor}
          // value={loginForm.email}
          keyboardType="email-address"
          onChangeText={(text) =>
            setUserCredentials((prevState) => ({ ...prevState, email: text }))
          }
          // value={loginForm.identity}
          // onChange={(event) => inputChangeHandler(event, "identity")}
        />
        <TextInput
          style={styles.input}
          // ref={passwordInput}
          placeholder="Password"
          placeholderTextColor={colors.formPlaceholderColor}
          // value={loginForm.password}
          secureTextEntry={true}
          onChangeText={(text) =>
            setUserCredentials((prevState) => ({
              ...prevState,
              password: text
            }))
          }
        />
        {invalidCredentials && (
          <Text style={styles.invalidDetailsText}>Invalid login details</Text>
        )}
        <TouchableOpacity
          style={[styles.loginButton, { marginTop: isFocused ? 20 : 20 }]}
          activeOpacity={0.5}
          onPress={() => refetch()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      {!isFocused && (
        <View style={styles.bottomTab}>
          <Text style={styles.bottomTabText}>
            Don't have an account yet? Create one&nbsp;
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Register")}
            >
              here
            </Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;
