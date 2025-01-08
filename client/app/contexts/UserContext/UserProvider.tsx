import { useUserState } from "../../hooks/useUserState";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUserState();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
