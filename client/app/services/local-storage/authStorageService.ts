import AsyncStorage from "@react-native-async-storage/async-storage";

import { InternalAuthState } from "../../types/auth/CommonAuthTypes";

export const getJwt = async () => {
  try {
    const token = await AsyncStorage.getItem("sessionToken");
    return token;
  } catch (err) {
    console.error("Error retrieving session token from local storage:", err);
    throw err;
  }
};

const setJwt = async (token: string) => {
  if (!token)
    throw new Error(
      "Token is an empty string. If attempting to remove the token from local storage, please use removeJwt"
    );
  await AsyncStorage.setItem("sessionToken", token);
};

const deleteJwt = async () => {
  await AsyncStorage.removeItem("sessionToken");
};

export const login = async (
  jwt: string,
  setAuthData: React.Dispatch<React.SetStateAction<InternalAuthState>>
) => {
  try {
    await setJwt(jwt);
    setAuthData({
      jwt,
      status: "authenticated"
    });
  } catch (err) {
    console.error("Error saving session token in local storage:", err);
    throw err;
  }
};

export const logout = async (
  setAuthData: React.Dispatch<React.SetStateAction<InternalAuthState>>
) => {
  try {
    await deleteJwt();
    setAuthData({
      jwt: null,
      status: "unauthenticated"
    });
  } catch (err) {
    console.error("Error deleting session token from local storage:", err);
    throw err;
  }
};

// // export const setUserID = async (userProfile: CreatedAccount) => {
// export const setUserID = async (userID: string) => {
//   try {
//     // AsyncStorage.setItem("userID", JSON.stringify(userProfile));
//     AsyncStorage.setItem("userID", userID);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getUserID = async () => {
//   try {
//     return AsyncStorage.getItem("userID");
//   } catch (err) {
//     console.log(err);
//   }
// };
