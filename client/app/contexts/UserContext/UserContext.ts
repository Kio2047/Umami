import { createContext } from "react";
import { InternalUserState, UserUtilities } from "../../types/UserTypes";

type UserContext = InternalUserState & { utilities: UserUtilities };

export const UserContext = createContext<UserContext | undefined>(undefined);
