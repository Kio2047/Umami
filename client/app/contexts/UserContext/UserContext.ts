import { createContext } from "react";
import { InternalUserState, UserUtilities } from "../../types/UserTypes";

type User = InternalUserState & { utilities: UserUtilities };

export const UserContext = createContext<User | undefined>(undefined);
