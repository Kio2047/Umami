import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

// TODO: now that "softwareKeyboardLayoutMode": "pan" can been added to expo config, see if you can remove the use of this custom hook
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
