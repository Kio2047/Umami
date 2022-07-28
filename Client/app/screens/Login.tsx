import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, Button, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { LoginScreenProps } from "../navTypes";
import logo from "../assets/logo.png";
import { backgroundColor, bottomTabBorderColor, defaultButtonColor, formInputBackgroundColor, formPlaceholderColor, primaryFontColor } from "../colors";

const Login = ( {navigation} : LoginScreenProps) => {

  const [loginForm, setLoginForm] = useState({
    identity: "",
    password: ""
  })

  const [isFocused, setIsFocused] = useState(false);

  const inputChangeHandler = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string): void => {
    setLoginForm({
      ...loginForm,
      [field]: event.nativeEvent.text
    });
  }

  const inputFocusHandler = (): void => {
    setIsFocused(true);
  }

  const inputBlurHandler = (): void => {
    setIsFocused(false);
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
        <TouchableOpacity style={styles.loginButton} activeOpacity={0.5} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTab}>
        <Text style={styles.bottomTabText}>Don't have an account yet? Create one&nbsp;
        <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>here</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40
  },
  input: {
    color: primaryFontColor,
    backgroundColor: formInputBackgroundColor,
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 15,
    borderRadius: 4
  },
  loginButton: {
    justifyContent: "center",
    width: 300,
    height: 50,
    backgroundColor: defaultButtonColor,
    borderRadius: 4,
    marginTop: 20
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