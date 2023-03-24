import { createContext } from "react";
import { useLocalStorageAuthData } from "./customHooks";

export const AuthContext = createContext<
  ReturnType<typeof useLocalStorageAuthData>
>([
  {
    jwt: null,
    userID: null,
    status: "loading"
  },
  () => {}
]);
