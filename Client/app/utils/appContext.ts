import { createContext } from "react";
import { CompleteUserDocument } from "../types";
import { useLocalStorageAuthData } from "./customHooks";

// export const AuthContext = createContext<
//   ReturnType<typeof useLocalStorageAuthData>
// >([
//   {
//     jwt: null,
//     userID: null,
//     status: "loading"
//   },
//   () => {}
// ]);
export const UserInfoContext = createContext<
  {userInfo: CompleteUserDocument, 
  auth: }
>([
  {
    jwt: null,
    userID: null,
    status: "loading"
  },
  () => {}
]);
