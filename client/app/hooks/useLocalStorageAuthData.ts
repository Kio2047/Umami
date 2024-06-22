import { useEffect, useState } from "react";
import { getJwt, getUserID } from "../services/deviceStorageService";
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
      //   await getJwt()
      //   await getUserID()
      // ]);
      const jwt = await getJwt();
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
