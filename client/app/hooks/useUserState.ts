import { useEffect, useState } from "react";

import { getUser, setUser } from "../services/local-storage/userStorageService";
import { InternalUserState, User, UserUtilities } from "../types/UserTypes";

export const useUserState = () => {
  const [internalState, setInternalState] = useState<InternalUserState>({
    user: null,
    status: "loading"
  });

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setInternalState({
        user,
        status: "complete"
      });
    })();
  }, []);

  const utilities: UserUtilities = {
    initialiseUser: async () => {
      try {
        const user: User = {
          data: {
            name: "",
            profileImageURL: "",
            username: ""
          },
          metadata: {
            completedAddProfileImageScreen: false
          }
        };
        await setUser(user);
      } catch (err) {
        console.error("Error saving user data in local storage:", err);
        throw err;
      }
    },

    updateUser: async ({ data, metadata }) => {
      try {
        if (!internalState.user)
          throw new Error(
            "No user data to update. Ensure user data is fetched or initialised before updating"
          );
        const updatedUser: User = {
          data: {
            ...internalState.user.data,
            ...(data ?? {})
          },
          metadata: {
            ...internalState.user.metadata,
            ...(metadata ?? {})
          }
        };
        await setUser(updatedUser);
        setInternalState({
          status: "complete",
          user: updatedUser
        });
      } catch (err) {
        console.error("Error saving user data in local storage:", err);
        throw err;
      }
    }
  };

  return { ...internalState, utilities };
};
