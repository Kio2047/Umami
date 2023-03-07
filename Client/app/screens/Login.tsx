import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard
} from "react-native";
import { CommonActions } from "@react-navigation/native";

import { LoginScreenProps, UserCredentials } from "../types";
import logo from "../assets/logo.png";
import colors from "../colors";
import { checkUserCredentials } from "../apiClientService";

const Login = ({ navigation }: LoginScreenProps) => {
  const [loginForm, setLoginForm] = useState<UserCredentials>({
    email: "",
    // identity: "",
    password: ""
  });

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState(false);

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

  const inputChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    field: string
  ): void => {
    setLoginForm({
      ...loginForm,
      [field]: event.nativeEvent.text
    });
  };

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
          placeholder="Email address"
          // placeholder="Email address or username"
          placeholderTextColor={colors.formPlaceholderColor}
          value={loginForm.email}
          keyboardType="email-address"
          onChange={(event) => inputChangeHandler(event, "email")}
          // value={loginForm.identity}
          // onChange={(event) => inputChangeHandler(event, "identity")}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.formPlaceholderColor}
          value={loginForm.password}
          secureTextEntry={true}
          onChange={(event) => inputChangeHandler(event, "password")}
        />
        {invalidCredentials && (
          <Text style={styles.invalidDetailsText}>Invalid login details</Text>
        )}
        <TouchableOpacity
          style={[styles.loginButton, { marginTop: isFocused ? 20 : 20 }]}
          activeOpacity={0.5}
          onPress={async () => {
            console.log("Hello");
            const authenticationOutcome = await checkUserCredentials({
              email: loginForm.email,
              password: loginForm.password
            });
            console.log("hello");
            console.log(authenticationOutcome);
            if (authenticationOutcome === "invalid details") {
              setInvalidCredentials(true);
              return;
            } else {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Feed",
                      params: {
                        feedUserInfo: authenticationOutcome
                      }
                    }
                  ]
                })
              );
            }
          }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  input: {
    color: colors.primaryFontColor,
    backgroundColor: colors.formInputBackgroundColor,
    width: 330,
    height: 50,
    padding: 10,
    marginBottom: 15,
    borderRadius: 3
  },
  invalidDetailsText: {
    color: "red",
    marginTop: -10,
    marginBottom: -11,
    padding: 0
  },
  loginButton: {
    justifyContent: "center",
    width: 330,
    height: 50,
    backgroundColor: colors.defaultButtonColor,
    borderRadius: 7
    // marginTop: 20
  },
  buttonText: {
    textAlign: "center",
    color: colors.primaryFontColor
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.backgroundColor,
    borderTopColor: colors.bottomTabBorderColor,
    borderTopWidth: 1
  },
  bottomTabText: {
    color: colors.primaryFontColor
  },
  registerLink: {
    color: colors.primaryFontColor,
    textDecorationLine: "underline",
    fontWeight: "bold"
  }
});

export default Login;
