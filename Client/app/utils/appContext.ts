import { createContext } from "react";
import { CompleteUserDocument } from "../types";
import { AuthData, useLocalStorageAuthData } from "./customHooks";

export const AppContext =
  createContext<// {userInfo: [CompleteUserDocument, React.Dispatch<React.SetStateAction<CompleteUserDocument>>],
  { auth: [AuthData, React.Dispatch<React.SetStateAction<AuthData>>] }>({
    auth: [
      {
        jwt: null,
        userID: null,
        status: "loading"
      },
      () => {}
    ]
    // userInfo: [{
    //   hello: "world"
    // }, () => {}]
  });
