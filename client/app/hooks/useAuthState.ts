import { useEffect, useState } from "react";
import { getJwt } from "../services/local-storage/authStorageService";
import { AuthState } from "../types/auth/CommonAuthTypes";

export const useAuthState = (): [
  AuthState,
  React.Dispatch<React.SetStateAction<AuthState>>
] => {
  const [authState, setAuthState] = useState<AuthState>({
    jwt: null,
    status: "loading"
  });

  useEffect(() => {
    (async () => {
      const jwt = await getJwt();
      if (!jwt) {
        setAuthState({
          jwt: null,
          status: "unauthenticated"
        });
      } else {
        setAuthState({
          jwt,
          status: "authenticated"
        });
      }
    })();
  }, []);

  return [authState, setAuthState];
};
