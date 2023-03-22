import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { getJWT, getUserID } from "../services/deviceStorageClient";

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

export const useLocalStorageAuthData = () => {
  const [authData, setAuthData] = useState<
    | { jwt: null; userID: null; ready: false }
    | {
        jwt: string;
        userID: string;
        ready: true;
      }
  >({
    jwt: null,
    userID: null,
    ready: false
  });
  useEffect(() => {
    (async () => {
      const [jwt, userID] = await Promise.all([
        await getJWT(),
        await getUserID()
      ]);
      if (!jwt || !userID) {
        throw new Error("Bearer token not present");
      } else {
        setAuthData({
          jwt,
          userID,
          ready: true
        });
      }
    })();
  }, []);

  return authData;
};
