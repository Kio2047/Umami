import { useEffect, useState } from "react";

import { UserState } from "../types/UserTypes";
import { getUser } from "../services/local-storage/userStorageService";

export const useLocalStorageUserData = (): [
  UserState,
  React.Dispatch<React.SetStateAction<UserState>>
] => {
  const [userState, setUserState] = useState<UserState>({
    user: null,
    status: "loading"
  });

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUserState({
        user,
        status: "complete"
      });
    })();
  }, []);

  return [userState, setUserState];
};
