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
import { getUserID } from "../deviceStorageClient";
import { sendPostRequest, sendGetRequest, sendPatchRequest } from "./APIUtils";

const baseURL =
  "https://8f47-2a00-23c8-5999-8f01-142b-bc0d-ce7-7d3.eu.ngrok.io";

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
    `${baseURL}/session`,
    newUserCredentials
  );
};

export const getURLSignature: QueryFunction<
  GetURLSignatureResponse,
  [string, string]
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
  return sendPatchRequest<string>(`${baseURL}/user/${await getUserID()}`, {
    operation: "replace",
    path: "/profileImageURL",
    value: newImageURL
  });
};

// export const getUserInfo: QueryFunction<
//   GetUserInfoResponse,
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
