import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../../types/UserTypes";

export const getUser = async (): Promise<User | null> => {
  try {
    const jsonUserData = await AsyncStorage.getItem("user");
    if (!jsonUserData) return null;
    // TODO: enforce type with zod
    return JSON.parse(jsonUserData);
  } catch (err) {
    console.error("Error retrieving user data from local storage:", err);
    throw err;
  }
};
