import { useContext } from "react";

import { UserContext } from "./UserContext";

export default () => {
  const userStateArray = useContext(UserContext);
  if (!userStateArray) {
    throw new Error("Component must be used within UserProvider");
  }
  return userStateArray;
};
