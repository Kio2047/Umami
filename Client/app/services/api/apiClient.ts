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
  // GetUserCardInfoResponse,
  // GetUserResultsResponse,
  LoginUserResponse,
  UserSearchResultsResponse
} from "../../Types/APIResponseTypes";
import { getUserID } from "../deviceStorageClient";
import { sendPostRequest, sendGetRequest, sendPatchRequest } from "./APIUtils";

const baseURL =
  "https://20e8-2a00-23c8-5999-8f01-f504-e714-e9cf-68da.eu.ngrok.io";

export const loginUser: MutationFunction<
  LoginUserResponse,
  LoginCredentials
> = async (userCredentials) => {
  return sendPostRequest<LoginUserResponse>(
    `${baseURL}/session`,
    userCredentials
  );
};

export const createNewUser: MutationFunction<
  CreateNewUserResponse,
  NewUserCredentials
> = async (newUserCredentials) => {
  return sendPostRequest<CreateNewUserResponse>(
    `${baseURL}/user`,
    newUserCredentials
  );
};

export const getURLSignature: QueryFunction<
  GetURLSignatureResponse,
  [string]
> = async ({ queryKey }) => {
  return sendGetRequest<GetURLSignatureResponse>(
    `${baseURL}/media-upload-signature/profile-image`
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
  {
    newImageURL: string;
  }
> = async ({ newImageURL }) => {
  return sendPatchRequest<string>(`${baseURL}/users/${await getUserID()}`, {
    operation: "replace",
    path: "/profileImageURL",
    value: newImageURL
  });
};

export const searchForUsers: QueryFunction<
  UserSearchResultsResponse,
  ["users", string]
> = async ({ queryKey }) => {
  const query = queryKey[1];
  return sendGetRequest<UserSearchResultsResponse>(
    `${baseURL}/users?q=${query}`
  );
};

// export const getLoggedInUserInfo: QueryFunction<>

// export const getUserInfo: QueryFunction<
//   GetUserResultsResponse,
//   ["users", string]
// > = async ({ queryKey }) => {
//   const userID = queryKey[1];
//   return sendGetRequest<string>(`${baseURL}/users/${userID}`);
// };

// export const getUserInfo: QueryFunction<
//   GetUserCardInfoResponse,
//   [string]
// > = async ({ queryKey }) => {
//   const;
// };

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
