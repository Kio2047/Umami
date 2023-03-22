import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateNewUserResponse } from "../Types/APIResponseTypes";

export const saveJWT = async (token: CreateNewUserResponse["token"]) => {
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

export const setUserInfo = async (
  userProfile: CreateNewUserResponse["createdAccount"]
) => {
  AsyncStorage.setItem("userInfo", JSON.stringify(userProfile));
};

export const getUserInfo = async () => {
  AsyncStorage.getItem("userInfo");
};
