import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CreateNewUserResponse,
  CreatedAccount
} from "../types/APIResponseTypes";

export const setJWT = async (token: string) => {
  try {
    AsyncStorage.setItem("sessionToken", token);
  } catch (err) {
    console.log(err);
  }
};

export const getJWT = async () => {
  try {
    return AsyncStorage.getItem("sessionToken");
  } catch (err) {
    console.log(err);
  }
};

// export const setUserID = async (userProfile: CreatedAccount) => {
export const setUserID = async (userID: string) => {
  try {
    // AsyncStorage.setItem("userID", JSON.stringify(userProfile));
    AsyncStorage.setItem("userID", userID);
  } catch (err) {
    console.log(err);
  }
};

export const getUserID = async () => {
  try {
    return AsyncStorage.getItem("userID");
  } catch (err) {
    console.log(err);
  }
};
