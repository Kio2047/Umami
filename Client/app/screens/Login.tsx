import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, Keyboard } from "react-native";
import { CommonActions } from "@react-navigation/native";

import { LoginScreenProps, UserCredentials } from "../types";
import logo from "../assets/logo.png";
import { backgroundColor, bottomTabBorderColor, defaultButtonColor, formInputBackgroundColor, formPlaceholderColor, primaryFontColor } from "../colors";
import { checkUserCredentials } from "../apiClientService";

const Login = ( {navigation} : LoginScreenProps) => {

  const [loginForm, setLoginForm] = useState<UserCredentials>({
    email: "",
    // identity: "",
    password: ""
  });

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(
    () => {
      Keyboard.addListener("keyboardDidShow", () => {
        setIsFocused(true);
      });
      Keyboard.addListener("keyboardDidHide", () => {
        setIsFocused(false);
      });

      return () => {
        Keyboard.removeAllListeners("keyboardDidShow");
        Keyboard.removeAllListeners("keyboardDidHide");
      }
    }, []
  )

  const inputChangeHandler = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string): void => {
    setLoginForm({
      ...loginForm,
      [field]: event.nativeEvent.text
    });
  }

  return (
    <SafeAreaView style={[styles.container, {justifyContent: isFocused ? "flex-start" : "center"}, {paddingTop: isFocused ? 10 : 0}]}>
        {/* fadeDuration={0} */}
        <Image style={[styles.logo, {marginBottom: isFocused ? 20 : 30 }]} source={logo} resizeMode="contain" />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            // placeholder="Email address or username"
            placeholderTextColor={formPlaceholderColor}
            value={loginForm.email}
            onChange={(event) => inputChangeHandler(event, "email")}
            // value={loginForm.identity}
            // onChange={(event) => inputChangeHandler(event, "identity")}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={formPlaceholderColor}
            value={loginForm.password}
            secureTextEntry={true}
            onChange={(event) => inputChangeHandler(event, "password")}
          />
          {invalidCredentials && <Text style={styles.invalidDetailsText}>Invalid login details</Text>}
          <TouchableOpacity
            style={[styles.loginButton, {marginTop: isFocused ? 20 : 20}]}
            activeOpacity={0.5}
            onPress={async () => {
              const response = await checkUserCredentials({email: loginForm.email, password: loginForm.password});
              const parsedResponse = await response.json();
              if (parsedResponse === "invalid details") {
                setInvalidCredentials(true);
                return;
              }
              else {
                navigation.dispatch(CommonActions.reset({
                  index: 0,
                  routes: [{name: "Feed", params: {userID: parsedResponse._id}}]
                }))
              }
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {!isFocused && <View style={styles.bottomTab}>
          <Text style={styles.bottomTabText}>Don't have an account yet? Create one&nbsp;
          <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>here</Text>
          </Text>
        </View> }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200
  },
  input: {
    color: primaryFontColor,
    backgroundColor: formInputBackgroundColor,
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
    backgroundColor: defaultButtonColor,
    borderRadius: 7,
    // marginTop: 20
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    color: primaryFontColor
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: backgroundColor,
    borderTopColor: bottomTabBorderColor,
    borderTopWidth: 1
  },
  bottomTabText: {
    color: primaryFontColor
  },
  registerLink: {
    color: primaryFontColor,
    textDecorationLine: "underline",
    fontWeight: "bold"
  }

})

export default Login