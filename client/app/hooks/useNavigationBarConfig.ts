import { useEffect, useState } from "react";
import { Dimensions, Platform, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export default () => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    // Make navigation bar transparent on Android Devices
    (async () => {
      if (Platform.OS === "android") {
        try {
          const screenHeight = Dimensions.get("screen").height;
          const windowHeight = Dimensions.get("window").height;
          const statusBarHeight = StatusBar.currentHeight ?? 0;
          const calculatedNavBarHeight =
            screenHeight - windowHeight - statusBarHeight;
          if (calculatedNavBarHeight) {
            // Delay addresses Expo bug which requires rerender to make navigation bar transparent
            await new Promise((resolve) => setTimeout(resolve, 50));
            await Promise.all([
              NavigationBar.setBackgroundColorAsync("#ffffff01"),
              NavigationBar.setPositionAsync("absolute")
            ]);
            setNavBarHeight(calculatedNavBarHeight);
          }
        } catch (error) {
          console.error("NavigationBar configuration failed:", error);
        }
      }
    })();
  }, []);
  // // Make navigation bar button colour toggle with light mode / dark mode
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await NavigationBar.setButtonStyleAsync();
  //     } catch (error) {
  //       console.error("NavigationBar configuration failed:", error);
  //     }
  //   })();
  // }, [theme]);
  return navBarHeight;
};
