import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, Button, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { LoginScreenProps } from "../navTypes";
import logo from "../assets/logo.png";
import { backgroundColor } from "../colors";

const Login = ( {navigation} : LoginScreenProps) => {

  const [loginForm, setLoginForm] = useState({
    identity: "",
    password: ""
  })

  const onInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string): void => {
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
          placeholder="Email address or username"
          value={loginForm.identity}
          onChange={(event) => onInputChange(event, "identity")}
        />
        <TextInput
          placeholder="Password"
          value={loginForm.password}
          onChange={(event) => onInputChange(event, "password")}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Home")}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 60
  },
})

export default Login