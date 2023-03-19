// import { v4 as uuidv4 } from "uuid";
// import { Types } from "mongoose";
import { Platform } from "react-native";

// type ObjectId = Types.ObjectId;

import type { LoginCredentials, NewPost, Post } from "../../types";
import { CreateSessionTokenResponse } from "../../Types/APIResponseTypes";
import { sendPostRequest } from "./APIUtils";

const baseURL =
  "https://4758-2a00-23c8-5999-8f01-7cc4-6311-b816-d65f.eu.ngrok.io";

export const createSessionToken = async ({
  queryKey
}: {
  queryKey: [string, LoginCredentials];
}): Promise<CreateSessionTokenResponse> => {
  const userCredentials = queryKey[1];
  return sendPostRequest<CreateSessionTokenResponse>(
    `${baseURL}/session`,
    userCredentials
  );
};

// export const getFeedPosts = async function (userID: string) {
//   const response = await fetch(`${baseURL}/user/get-feed-posts/${userID}`);
//   const parsedResponse = await response.json();
//   return parsedResponse;
// };

// export const sendNewPost = async function (postData: NewPost) {
//   const response = await fetch(`${baseURL}/user/create-new-post`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(postData)
//   });

//   const parsedResponse = await response.json();
//   return parsedResponse;
// };

// export const getPostsByUser = async function (userID: string): Promise<Post[]> {
//   const response = await fetch(`${baseURL}/user/get-posts/${userID}`);

//   const parsedResponse = await response.json();
//   return parsedResponse;
// };

// const uploadImages = async function (imageURLs: string[]) {
//   const reqBody = createFormData(imageURLs);
//   const response = await fetch(`${baseURL}/user/save-images`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data"
//     },
//     body: reqBody
//   });

//   const parsedResponse = await response.json();
//   return parsedResponse;
// };

// const createFormData = (imageURLs: string[]) => {
//   const data = new FormData();
//   for (let imageURL of imageURLs) {
//     data.append("photos", {
//       // @ts-ignore
//       name: "filename",
//       type: "image/jpeg",
//       uri: Platform.OS === "ios" ? imageURL.replace("file://", "") : imageURL
//     });
//   }
//   return data;
// };
