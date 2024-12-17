import { useLocalStorageAuthData } from "../../hooks/useLocalStorageAuthData";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authData = useLocalStorageAuthData();

  if (authData[0].status === "loading") {
    // TODO: add loading screen
    return <></>;
  }
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
