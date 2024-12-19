import { useLocalStorageUserData } from "../../hooks/useLocalStorageUserData";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userStateArray = useLocalStorageUserData();
  return (
    <UserContext.Provider value={userStateArray}>
      {children}
    </UserContext.Provider>
  );
};
