import React from "react";
import { View, Text } from "react-native";

import styles from "./BottomTabStyles";
import { StackScreenProps } from "../../Types/NavigationTypes";

interface BottomTabPropsBase {
  message: string;
}

interface BottomTabLoginPageProps extends BottomTabPropsBase {
  navigation: StackScreenProps<"Login">["navigation"];
  navigateTo: "Register";
}

interface BottomTabRegisterPageProps extends BottomTabPropsBase {
  navigation: StackScreenProps<"Register">["navigation"];
  navigateTo: "Login";
}

type BottomTabProps = BottomTabLoginPageProps | BottomTabRegisterPageProps;

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
