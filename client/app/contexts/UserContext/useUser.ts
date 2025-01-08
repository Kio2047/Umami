import { useContext } from "react";

import { UserContext } from "./UserContext";

export default () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("Component must be used within UserProvider");
  }
  return user;
};
