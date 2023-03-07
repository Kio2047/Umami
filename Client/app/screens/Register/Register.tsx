import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard
} from "react-native";

import styles from "./RegisterStyles";
import { RegisterScreenProps } from "../../types";
import logo from "../../assets/logo.png";

const Register = ({ navigation }: RegisterScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      <Text>WIP</Text>
    </SafeAreaView>
  );
};

export default Register;
