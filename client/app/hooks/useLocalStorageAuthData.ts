import { useEffect, useState } from "react";
import { getJwt } from "../services/local-storage/authStorageService";
import { LocalStorageAuthData } from "../types/auth/CommonAuthTypes";

export const useLocalStorageAuthData = (): [
  LocalStorageAuthData,
  React.Dispatch<React.SetStateAction<LocalStorageAuthData>>
] => {
  const [localStorageAuthData, setLocalStorageAuthData] =
    useState<LocalStorageAuthData>({
      jwt: null,
      status: "loading"
    });

  useEffect(() => {
    (async () => {
      const jwt = await getJwt();
      if (!jwt) {
        setLocalStorageAuthData({
          jwt: null,
          status: "unauthenticated"
        });
      } else {
        setLocalStorageAuthData({
          jwt,
          status: "authenticated"
        });
      }
    })();
  }, []);

  return [localStorageAuthData, setLocalStorageAuthData];
};
