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

import styles from "./LandingPageStyles";
import logo from "../../assets/logo.png";
import { StackScreenProps } from "../../Types/NavigationTypes";
import { useLocalStorageAuthData } from "../../hooks/useLocalStorageAuthData";

const LandingPage = ({
  navigation
}: {
  navigation: StackScreenProps<"LandingPage">["navigation"];
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* fadeDuration={0} */}
      <Image style={styles.logo} source={logo} resizeMode="contain" />

      <View style={styles.buttonContainer}>
        {/* TODO: add accessibility to the touchable opacities */}
        <TouchableOpacity
          style={styles.topButton}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Register")}
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
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.bottomButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
