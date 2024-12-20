import { useEffect, useState } from "react";
import {
  getJwt,
  login as wrappedLogin,
  logout as wrappedLogout
} from "../services/local-storage/authStorageService";
import {
  AuthUtilities,
  InternalAuthState
} from "../types/auth/CommonAuthTypes";

export const useAuthState = () => {
  const [internalState, setInternalState] = useState<InternalAuthState>({
    jwt: null,
    status: "loading"
  });

  useEffect(() => {
    (async () => {
      try {
        const jwt = await getJwt();
        if (!jwt) {
          setInternalState({
            jwt: null,
            status: "unauthenticated"
          });
        } else {
          setInternalState({
            jwt,
            status: "authenticated"
          });
        }
      } catch (err) {
        console.error("Error initializing auth state:", err);
        setInternalState({
          jwt: null,
          status: "unauthenticated"
        });
      }
    })();
  }, []);

  const utilities: AuthUtilities = {
    login: async (jwt: string) => {
      if (internalState.status === "authenticated") {
        console.warn("User is already logged in");
        return;
      }
      wrappedLogin(jwt, setInternalState);
    },
    logout: async () => {
      if (internalState.status === "unauthenticated") {
        console.warn("User is already logged out");
        return;
      }
      wrappedLogout(setInternalState);
    }
  };

  return { ...internalState, utilities };
};
