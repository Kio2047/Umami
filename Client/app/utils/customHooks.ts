import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useInputFocusTracker = () => {
  const [isFocusedOnInput, setIsFocusedOnInput] = useState<boolean>(false);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsFocusedOnInput(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsFocusedOnInput(false);
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  return isFocusedOnInput;
};
