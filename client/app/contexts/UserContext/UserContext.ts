import { createContext } from "react";
import { UserState } from "../../types/UserTypes";

export const UserContext = createContext<
  [UserState, React.Dispatch<React.SetStateAction<UserState>>] | undefined
>(undefined);
