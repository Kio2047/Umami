import { useLocalStorageAuthData } from "../../hooks/useLocalStorageAuthData";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authData = useLocalStorageAuthData();
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
