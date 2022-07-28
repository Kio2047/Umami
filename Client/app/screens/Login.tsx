import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, Keyboard } from "react-native";
import { CommonActions } from "@react-navigation/native";

import { LoginScreenProps } from "../navTypes";
import logo from "../assets/logo.png";
import { backgroundColor, bottomTabBorderColor, defaultButtonColor, formInputBackgroundColor, formPlaceholderColor, primaryFontColor } from "../colors";

const Login = ( {navigation} : LoginScreenProps) => {

  const [loginForm, setLoginForm] = useState({
    identity: "",
    password: ""
  })

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
    <SafeAreaView style={styles.container}>
        {/* fadeDuration={0} */}
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email address or username"
            placeholderTextColor={formPlaceholderColor}
            value={loginForm.identity}
            onChange={(event) => inputChangeHandler(event, "identity")}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={formPlaceholderColor}
            value={loginForm.password}
            onChange={(event) => inputChangeHandler(event, "password")}
          />
          <TouchableOpacity
            style={[styles.loginButton, {marginTop: isFocused ? 0 : 20}]}
            activeOpacity={0.5}
            onPress={() => {
              navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{name: "Home"}]
              }))
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
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30
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