import React from "react";
import { View, Text } from "react-native";

import styles from "./BottomTab.styles";
import { AuthStackParamList } from "../../types/NavigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

// interface BottomTabPropsBase {
//   message: string;
// }

// interface BottomTabLoginPageProps extends BottomTabPropsBase {
//   navigation: StackScreenProps<"Login">["navigation"];
//   navigateTo: "Register";
// }

// interface BottomTabRegisterPageProps extends BottomTabPropsBase {
//   navigation: StackScreenProps<"Register">["navigation"];
//   navigateTo: "Login";
// }

// type BottomTabProps = BottomTabLoginPageProps | BottomTabRegisterPageProps;

interface BottomTabProps {
  navigation: StackNavigationProp<AuthStackParamList>;
  message: string;
  // TODO: update navigateTo type for new registration screens
  navigateTo: "Register" | "Login";
}

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
