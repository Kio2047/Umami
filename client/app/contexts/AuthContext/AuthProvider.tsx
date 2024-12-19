import { useAuthState } from "../../hooks/useAuthState";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authStateArray = useAuthState();
  return (
    <AuthContext.Provider value={authStateArray}>
      {children}
    </AuthContext.Provider>
  );
};
