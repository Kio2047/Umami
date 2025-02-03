import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";

import styles from "./WelcomeScreen.styles";
import logo from "../../assets/images/logo-transparent.png";
import { StackScreenProps } from "../../types/NavigationTypes";

// TODO: add animation to logo and screen content the first time the page is loaded up

const WelcomeScreen = ({
  navigation
}: {
  navigation: StackScreenProps<"WelcomeScreen">["navigation"];
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* fadeDuration={0} */}
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      {/* TODO: Add text below logo: e.g. "See what the world's eating" */}

      <View style={styles.buttonContainer}>
        {/* TODO: add accessibility to the touchable opacities */}
        <TouchableOpacity
          style={styles.topButton}
          activeOpacity={0.5}
          // onPress={() => navigation.navigate("Register")}
          onPress={() => navigation.navigate("RegisterFullNameScreen")}
        >
          <Text style={styles.topButtonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.horizontalRuleContainer}>
          <View style={styles.ruleLine} />
          <Text style={styles.ruleText}>OR</Text>
          <View style={styles.ruleLine} />
        </View>

        <TouchableOpacity
          style={styles.bottomButton}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.bottomButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
