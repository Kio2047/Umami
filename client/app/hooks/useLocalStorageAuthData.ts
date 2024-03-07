import { useEffect, useState } from "react";
import { getJWT, getUserID } from "../services/deviceStorageClient";
import { LocalStorageAuthData } from "../types/auth/CommonAuthTypes";

export const useLocalStorageAuthData = (): [
  LocalStorageAuthData,
  React.Dispatch<React.SetStateAction<LocalStorageAuthData>>
] => {
  const [localStorageAuthData, setLocalStorageAuthData] =
    useState<LocalStorageAuthData>({
      jwt: null,
      // userID: null,
      status: "loading"
    });

  useEffect(() => {
    (async () => {
      // const [jwt, userID] = await Promise.all([
      //   await getJWT()
      //   await getUserID()
      // ]);
      const jwt = await getJWT();
      if (!jwt) {
        // if (!jwt || !userID) {
        setLocalStorageAuthData({
          jwt: null,
          // userID: null,
          status: "unauthenticated"
        });
      } else {
        setLocalStorageAuthData({
          jwt,
          // userID,
          status: "authenticated"
        });
      }
    })();
  }, []);

  return [localStorageAuthData, setLocalStorageAuthData];
};
