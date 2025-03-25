import { StyleProp, View, ViewStyle } from "react-native";

import styles from "./AppScreenBackground.styles";

// If dark mode use darkmodebackground, else...

const AuthScreenBackground = ({
  additionalStyles,
  children
}: {
  additionalStyles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) => {
  return <View style={[styles.container, additionalStyles]}>{children}</View>;
};

export default AuthScreenBackground;
