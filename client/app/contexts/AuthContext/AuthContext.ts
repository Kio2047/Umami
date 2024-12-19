import { createContext } from "react";
import { AuthState } from "../../types/auth/CommonAuthTypes";

export const AuthContext = createContext<
  [AuthState, React.Dispatch<React.SetStateAction<AuthState>>] | undefined
>(undefined);
