import { createContext } from "react";
import {
  AuthUtilities,
  InternalAuthState
} from "../../types/auth/CommonAuthTypes";

type AuthContext = InternalAuthState & { utilities: AuthUtilities };

export const AuthContext = createContext<AuthContext | undefined>(undefined);
