import { View, Text } from "react-native";
import React from "react";

import styles from "./BottomTabStyles";
import { StackScreenProps } from "../../Types/NavigationTypes";

interface BottomTabPropsBase {
  message: string;
}

interface BottomTabLoginPage extends BottomTabPropsBase {
  navigation: StackScreenProps<"Login">["navigation"];
  navigateTo: "Register";
}

interface BottomTabRegisterPage extends BottomTabPropsBase {
  navigation: StackScreenProps<"Register">["navigation"];
  navigateTo: "Login";
}

type BottomTabProps = BottomTabLoginPage | BottomTabRegisterPage;

const BottomTab = ({ navigation, message, navigateTo }: BottomTabProps) => {
  return (
    <View style={styles.bottomTab}>
      <Text style={styles.bottomTabText}>
        {message}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate(navigateTo)}
        >
          here
        </Text>
      </Text>
    </View>
  );
};

export default BottomTab;
