import { View, Text, ImageBackground, StatusBar } from "react-native";
import React from "react";

import styles from "./ScreenBackgroundStyles";
import DarkModeBackground from "../../assets/darkmode-background.png";

// If dark mode use darkmodebackground, else...

const BackgroundImage = ({
  children
}: {
  // imageURI: string;
  children: React.ReactNode;
}) => {
  return (
    <ImageBackground style={styles.container} source={DarkModeBackground}>
      {children}
    </ImageBackground>
  );
};

export default BackgroundImage;
