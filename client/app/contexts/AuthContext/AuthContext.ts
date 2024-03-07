import { createContext } from "react";
import { LocalStorageAuthData } from "../../types/auth/CommonAuthTypes";

export const AuthContext = createContext<
  | [
      LocalStorageAuthData,
      React.Dispatch<React.SetStateAction<LocalStorageAuthData>>
    ]
  | undefined
>(undefined);
