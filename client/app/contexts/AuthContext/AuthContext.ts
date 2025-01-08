import { createContext } from "react";
import {
  AuthUtilities,
  InternalAuthState
} from "../../types/auth/CommonAuthTypes";

type Auth = InternalAuthState & { utilities: AuthUtilities };

export const AuthContext = createContext<Auth | undefined>(undefined);
