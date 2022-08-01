import type { UserCredentials } from "./types"

const baseURL = "https://47bf-2a00-23c8-5984-3401-40c4-77f5-462a-44f.eu.ngrok.io"

export const checkUserCredentials = async function (credentialData: UserCredentials) {
  const response = await fetch(`${baseURL}/authenticate/check-user-credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentialData)
  })

  return response;
}