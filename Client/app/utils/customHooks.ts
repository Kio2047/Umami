import { createContext, useEffect, useState } from "react";
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

export type AuthData =
  | { jwt: null; userID: null; status: "loading" | "failure" }
  | { jwt: string; userID: string; status: "success" };

export const useLocalStorageAuthData = (): [
  AuthData,
  React.Dispatch<React.SetStateAction<AuthData>>
] => {
  const [authData, setAuthData] = useState<AuthData>({
    jwt: null,
    userID: null,
    status: "loading"
  });

  useEffect(() => {
    (async () => {
      const [jwt, userID] = await Promise.all([
        await getJWT(),
        await getUserID()
      ]);
      if (!jwt || !userID) {
        setAuthData({
          jwt: null,
          userID: null,
          status: "failure"
        });
      } else {
        setAuthData({
          jwt,
          userID,
          status: "success"
        });
      }
    })();
  }, []);

  // return [authData, setAuthData];
  return [authData, setAuthData];
};
