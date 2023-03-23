// import { v4 as uuidv4 } from "uuid";
// import { Types } from "mongoose";
import { MutationFunction, Query, QueryFunction } from "@tanstack/react-query";
import { Platform } from "react-native";

// type ObjectId = Types.ObjectId;

import type {
  LoginCredentials,
  NewUserCredentials,
  NewPost,
  Post
} from "../../types";
import {
  CloudinaryImageUploadResponse,
  CreateNewUserResponse,
  GetURLSignatureResponse,
  GetUserInfoResponse,
  LoginUserResponse
} from "../../Types/APIResponseTypes";
import { sendPostRequest, sendGetRequest, sendPatchRequest } from "./APIUtils";

const baseURL = "https://c9f7-86-130-8-199.eu.ngrok.io";

export const loginUser: QueryFunction<
  LoginUserResponse,
  [string, LoginCredentials]
> = async ({ queryKey }) => {
  const userCredentials = queryKey[1];
  return sendPostRequest<LoginUserResponse>(
    `${baseURL}/session`,
    userCredentials
  );
};

export const createNewUser: QueryFunction<
  CreateNewUserResponse,
  [string, NewUserCredentials]
> = async ({ queryKey }) => {
  const userCredentials = queryKey[1];
  return sendPostRequest<CreateNewUserResponse>(
    `${baseURL}/session`,
    userCredentials
  );
};

export const getURLSignature: QueryFunction<
  GetURLSignatureResponse,
  [string, string]
> = async ({ queryKey }) => {
  const jwt = queryKey[1];

  return sendGetRequest<GetURLSignatureResponse>(
    `${baseURL}/media-upload-signature/profile-image`,
    jwt
  );
};

export const uploadCloudinaryMedia: MutationFunction<
  CloudinaryImageUploadResponse,
  {
    folder: string;
    base64Image: string;
    timestamp: number;
    api_key: number;
    signature: string;
  }
> = async (uploadData) => {
  return sendPostRequest<CloudinaryImageUploadResponse>(
    "https://api.cloudinary.com/v1_1/di3penpbh/image/upload",
    uploadData
  );
};

export const updateUserProfileImageURL: MutationFunction<
  string,
  { userID: string; newImageURL: string; jwt: string }
> = async ({ userID, newImageURL, jwt }) => {
  return sendPatchRequest<string>(
    `${baseURL}/user/${userID}`,
    {
      operation: "replace",
      path: "/profileImageURL",
      value: newImageURL
    },
    jwt
  );
};

export const getUserInfo: QueryFunction<
  GetUserInfoResponse,
  [string, string]
> = async ({ queryKey }) => {};

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
