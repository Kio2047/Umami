import { useEffect, useState } from "react";
import { getJWT, getUserID } from "../services/deviceStorageClient";

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

  return [authData, setAuthData];
};
