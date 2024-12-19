import { useContext } from "react";

import { AuthContext } from "./AuthContext";

export default () => {
  const authStateArray = useContext(AuthContext);
  if (!authStateArray) {
    throw new Error("Component must be used within AuthProvider");
  }
  return authStateArray;
};
