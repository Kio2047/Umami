import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Keyboard } from "react-native";

import { RegisterScreenProps } from "../types";
import logo from "../assets/logo.png";

const Register = ( {navigation} : RegisterScreenProps) => {

  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <Text>WIP</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "violet",
  justifyContent: "center",
  alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30
  }
})

export default Register