import { ImageBackground, StyleProp, ViewStyle } from "react-native";

import styles from "./ScreenBackground.styles";
import DarkModeBackground from "../../assets/images/darkmode-background.png";

// If dark mode use darkmodebackground, else...

const ScreenBackground = ({
  additionalStyles,
  children
}: {
  additionalStyles: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) => {
  return (
    <ImageBackground
      style={[styles.container, additionalStyles]}
      source={DarkModeBackground}
    >
      {children}
    </ImageBackground>
  );
};

export default ScreenBackground;
