import type { UserCredentials } from "./types"

const baseURL = ""

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