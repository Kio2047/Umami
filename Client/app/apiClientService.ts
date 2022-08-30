// import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import { Platform } from "react-native";

type ObjectId = Types.ObjectId

import type { UserCredentials, NewPost, Post } from "./types"

const baseURL = "https://6c05-82-163-118-2.eu.ngrok.io"

export const checkUserCredentials = async function (credentialData: UserCredentials) {
  const response = await fetch(`${baseURL}/authenticate/check-user-credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentialData)
  });

  const parsedResponse = await response.json();
  return parsedResponse;
}

export const getFeedPosts = async function (userID: string) {
  const response = await fetch(`${baseURL}/user/get-feed-posts/${userID}`);
  const parsedResponse = await response.json();
  return parsedResponse;
}

export const sendNewPost = async function (postData: NewPost) {
  const response = await fetch(`${baseURL}/user/create-new-post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })

  const parsedResponse = await response.json()
  return parsedResponse;
}

export const getPostsByUser = async function (userID: string): Promise<Post[]> {
  const response = await fetch(`${baseURL}/user/get-posts/${userID}`);

  const parsedResponse = await response.json();
  return parsedResponse;
}

const uploadImages = async function (imageURLs: string[]) {
  const reqBody = createFormData(imageURLs);
  const response = await fetch(`${baseURL}/user/save-images`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: reqBody
  });

  const parsedResponse = await response.json();
  return parsedResponse;
}


const createFormData = (imageURLs: string[]) => {
  const data = new FormData();
  for (let imageURL of imageURLs) {
    data.append("photos", {
      // @ts-ignore
      name: "filename",
      type: "image/jpeg",
      uri: Platform.OS === "ios" ? imageURL.replace("file://", "") : imageURL,
    })
  }
  return data;
}

