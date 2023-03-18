import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveJWT = async (token: string) => {
  try {
    AsyncStorage.setItem("sessionToken", token);
  } catch (err) {
    console.log(err);
  }
};

export const getJWT = async () => {
  try {
    AsyncStorage.getItem("sessionToken");
  } catch (err) {
    console.log(err);
  }
};
