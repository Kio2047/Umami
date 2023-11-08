import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext/AuthContext";

export const useAuthContext = () => {
  const authData = useContext(AuthContext);
  if (!authData) {
    throw new Error("Component must be used within AuthContextProvider");
  }
  return authData;
};
