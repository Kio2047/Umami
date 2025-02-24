// import { v4 as uuidv4 } from "uuid";
// import { Types } from "mongoose";
import { MutationFunction, Query, QueryFunction } from "@tanstack/react-query";

import {
  CloudinaryImageUploadResponse,
  RegisterUserResponse,
  GetUploadSignatureResponse,
  LoginUserResponse
  // UserSearchResultsResponse
} from "../../types/APIResponseTypes";
// import { getUserID } from "../deviceStorageService";
import { sendPOSTRequest, sendGETRequest, sendPATCHRequest } from "./apiUtils";
import { NewUserCredentials } from "../../types/auth/RegisterTypes";
import { ImageUploadRequest } from "../../types/APIRequestTypes";
import { ExistingUserCredentials } from "../../types/auth/LoginTypes";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const registerUser: MutationFunction<
  RegisterUserResponse,
  NewUserCredentials
> = async (newUserCredentials) => {
  return sendPOSTRequest<RegisterUserResponse, NewUserCredentials>(
    `${baseURL}/user`,
    newUserCredentials
  );
};

export const loginUser: MutationFunction<
  LoginUserResponse,
  ExistingUserCredentials
> = async (userCredentials) => {
  return sendPOSTRequest<LoginUserResponse, ExistingUserCredentials>(
    `${baseURL}/session`,
    userCredentials
  );
};

export const getProfileImageUploadSignature: QueryFunction<
  GetUploadSignatureResponse,
  [string]
> = async () => {
  return sendGETRequest<GetUploadSignatureResponse>(
    `${baseURL}/image-upload-signature/profile_images`
  );
};

export const uploadMedia: MutationFunction<
  CloudinaryImageUploadResponse,
  ImageUploadRequest
> = async (uploadData) => {
  return sendPOSTRequest<CloudinaryImageUploadResponse, ImageUploadRequest>(
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
  return sendPATCHRequest<
    string,
    {
      newImageURL: string;
    }
  >(`${baseURL}/users/me`, {
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
  return sendGETRequest<UserSearchResultsResponse>(
    `${baseURL}/users?q=${query}`
  );
};

// export const getLoggedInUserInfo: QueryFunction<>

// export const getUserInfo: QueryFunction<
//   GetUserResultsResponse,
//   ["users", string]
// > = async ({ queryKey }) => {
//   const userID = queryKey[1];
//   return sendGETRequest<string>(`${baseURL}/users/${userID}`);
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
