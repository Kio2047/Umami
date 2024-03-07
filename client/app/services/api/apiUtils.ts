import { getJWT } from "../deviceStorageClient";

export class FailedRequestError extends Error {
  public readonly responseBody?: unknown;
  public readonly statusCode?: number;
  public readonly statusClass?: string;
  constructor(
    message?: string,
    optionalData?: {
      responseBody?: unknown;
      statusCode?: number;
    }
  ) {
    super(message);
    this.responseBody = optionalData?.responseBody;
    this.statusCode = optionalData?.statusCode;
    this.statusClass = optionalData?.statusCode?.toString()[0] + "xx";
  }
  get name(): string {
    return "FailedRequestError";
  }
}

// TODO: access the JWT value from context cache in request functions (without passing in as params via the query key) to avoid repeated grabs from local storage

export const sendPostRequest = async <ResponseBody, RequestBody>(
  URL: string,
  body: RequestBody
): Promise<ResponseBody> => {
  const jwt = await getJWT();
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(jwt && { Authorization: `Bearer ${jwt}` })
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new FailedRequestError(`POST request to ${URL} failed`, {
      statusCode: response.status,
      responseBody: await response.json()
    });
  }
  return response.json() as Promise<ResponseBody>;
};

export const sendGetRequest = async <ResponseBody, RequestBody>(
  URL: string
): Promise<ResponseBody> => {
  const jwt = await getJWT();
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(jwt && { Authorization: `Bearer ${jwt}` })
    }
  });
  if (!response.ok) {
    throw new FailedRequestError(`GET request to ${URL} failed`, {
      statusCode: response.status,
      responseBody: await response.json()
    });
  }
  return response.json() as Promise<ResponseBody>;
};

export const sendPatchRequest = async <ResponseBody, RequestBody>(
  URL: string,
  body: {
    operation: "add" | "remove" | "replace";
    path: string;
    value: any;
  }
): Promise<ResponseBody> => {
  const jwt = await getJWT();

  const response = await fetch(URL, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(jwt && { Authorization: `Bearer ${jwt}` })
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new FailedRequestError(`PATCH request to ${URL} failed`, {
      statusCode: response.status,
      responseBody: await response.json()
    });
  }
  return response.json() as Promise<ResponseBody>;
};
