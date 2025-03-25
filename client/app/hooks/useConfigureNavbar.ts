import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export default (navBarHeight: number) => {
  useEffect(() => {
    // Make navigation bar transparent on Android Devices
    if (Platform.OS === "android" && navBarHeight > 0) {
      (async () => {
        try {
          // Delay addresses Expo bug which requires rerender to make navigation bar transparent
          await new Promise((resolve) => setTimeout(resolve, 50));
          await Promise.all([
            NavigationBar.setBackgroundColorAsync("#ffffff01"),
            NavigationBar.setPositionAsync("absolute")
          ]);
        } catch (error) {
          console.error("NavigationBar configuration failed:", error);
        }
      })();
    }
  }, [navBarHeight]);
  // TODO: Make navigation bar button colour toggle with light mode / dark mode
  // await NavigationBar.setButtonStyleAsync();
  // [navBarHeight, theme]);
};
