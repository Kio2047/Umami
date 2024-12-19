import { useUserState } from "../../hooks/useUserState";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userStateArray = useUserState();
  return (
    <UserContext.Provider value={userStateArray}>
      {children}
    </UserContext.Provider>
  );
};
