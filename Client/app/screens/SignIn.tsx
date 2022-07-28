import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar} from "react-native";
import { CommonActions } from "@react-navigation/native";

import { backgroundColor, defaultButtonColor, primaryFontColor } from "../colors";
import type { SignInScreenProps } from "../navTypes";
import logo from "../assets/logo.png"

const SignIn = ( {navigation}: SignInScreenProps ) => {

  return (
    <SafeAreaView style={styles.container}>
      {/* fadeDuration={0} */}
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      <View style={styles.buttonContainer}>
        {/* add accessibility to the touchable opacities */}
        <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={() => {
          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{name: "Home"}]
          //   })
          // )
          navigation.navigate('Register');
        }}>
          <Text style={styles.topButtonText}>Create Account</Text>
        </ TouchableOpacity>

        <View style={styles.horizontalRuleContainer}>
          <View style={styles.ruleLine} />
          <Text style={styles.ruleText}>OR</Text>
          <View style={styles.ruleLine} />
        </View>

        <TouchableOpacity style={styles.bottomButton} activeOpacity={0.5} onPress={() => {
        //   navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{name: "Home"}]
        //     })
        //   )
         navigation.navigate('Login');
        }}
        >
          <Text style={styles.bottomButtonText}>Login</Text>
        </ TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30
  },
  buttonContainer: {
    alignItems: "center"
  },
  topButton: {
    justifyContent: "center",
    width: 300,
    height: 50,
    backgroundColor: defaultButtonColor,
    marginBottom: 15,
    borderRadius: 7
  },
  bottomButton: {
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: backgroundColor,
    marginBottom: 15,
    borderRadius: 7
  },
  topButtonText: {
    textAlign: "center",
    color: primaryFontColor,
    fontWeight: "500"
  },
  bottomButtonText: {
    textAlign: "center",
    color: defaultButtonColor,
    fontWeight: "500"
  },
  horizontalRuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruleLine: {
    flex: 1,
    height: 1,
    backgroundColor: primaryFontColor
  },
  ruleText: {
    width: 50,
    textAlign: 'center',
    color: primaryFontColor
  }
})

export default SignIn