import { ImageBackground, StyleProp, ViewStyle } from "react-native";
import React from "react";

import styles from "./ScreenBackgroundStyles";
import DarkModeBackground from "../../assets/darkmode-background.png";

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
