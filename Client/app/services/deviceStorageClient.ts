import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateNewUserResponse } from "../Types/APIResponseTypes";

export const setJWT = async (token: string) => {
  // try {
  AsyncStorage.setItem("sessionToken", token);
  // } catch (err) {
  //   console.log(err);
  // }
};

export const getJWT = async () => {
  // try {
  return AsyncStorage.getItem("sessionToken");
  // } catch (err) {
  //   console.log(err);
  // }
};

export const setUserID = async (userProfile: string) => {
  AsyncStorage.setItem("userID", JSON.stringify(userProfile));
};

export const getUserID = async () => {
  return AsyncStorage.getItem("userID");
};
