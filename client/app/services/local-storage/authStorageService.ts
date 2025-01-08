import AsyncStorage from "@react-native-async-storage/async-storage";

export const getJwt = async () => {
  const token = await AsyncStorage.getItem("sessionToken");
  return token;
};

export const setJwt = async (token: string) => {
  if (!token)
    throw new Error(
      "Token is an empty string. If attempting to remove the token from local storage, please use removeJwt"
    );
  await AsyncStorage.setItem("sessionToken", token);
};

export const deleteJwt = async () => {
  await AsyncStorage.removeItem("sessionToken");
};
