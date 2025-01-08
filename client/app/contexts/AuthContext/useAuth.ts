import { useContext } from "react";

import { AuthContext } from "./AuthContext";

export default () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Component must be used within AuthProvider");
  }
  return auth;
};
