import { createContext } from "react";
import { AuthData } from "../../hooks/useLocalStorageAuthData";

export const AuthContext = createContext<
  [AuthData, React.Dispatch<React.SetStateAction<AuthData>>] | undefined
>(undefined);
