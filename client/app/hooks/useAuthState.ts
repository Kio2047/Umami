import { useEffect, useState } from "react";

import {
  deleteJwt,
  getJwt,
  setJwt
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
      try {
        if (internalState.status === "authenticated") {
          console.warn("User is already logged in");
          return;
        }
        await setJwt(jwt);
        setInternalState({
          jwt,
          status: "authenticated"
        });
      } catch (err) {
        console.error("Error saving session token in local storage:", err);
        throw err;
      }
    },
    logout: async () => {
      try {
        if (internalState.status === "unauthenticated") {
          console.warn("User is already logged out");
          return;
        }
        await deleteJwt();
        setInternalState({
          jwt: null,
          status: "unauthenticated"
        });
      } catch (err) {
        console.error("Error deleting session token from local storage:", err);
        throw err;
      }
    }
  };

  return { ...internalState, utilities };
};
