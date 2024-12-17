import { useContext } from "react";

import { AuthContext } from "./AuthContext";

export default () => {
  const authData = useContext(AuthContext);
  if (!authData) {
    throw new Error("Component must be used within AuthContextProvider");
  }
  return authData;
};
