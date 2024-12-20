import { createContext } from "react";
import {
  AuthUtilities,
  InternalAuthState
} from "../../types/auth/CommonAuthTypes";

type AuthState = InternalAuthState & { utilities: AuthUtilities };

export const AuthContext = createContext<AuthState | undefined>(undefined);
