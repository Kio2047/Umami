import type { UserCredentials, NewPost } from "./types"

const baseURL = "https://47bf-2a00-23c8-5984-3401-40c4-77f5-462a-44f.eu.ngrok.io"

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

export const loadFeed = async function (userID: string) {
  const response = await fetch(`${baseURL}/user/get-posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userID })
  });

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