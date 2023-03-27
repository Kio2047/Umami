import { getJWT } from "../deviceStorageClient";

export class FailedRequestError extends Error {
  public responseBody?: any;
  public statusCode?: number;
  public statusClass?: string;
  constructor(
    message?: string,
    optionalData?: {
      responseBody?: any;
      statusCode?: number;
    }
  ) {
    super(message);
    this.responseBody = optionalData?.responseBody;
    this.statusCode = optionalData?.statusCode;
    this.statusClass = optionalData?.statusCode?.toString()[0] + "xx";
    this.name = "FailedRequestError";
  }
}

// TODO: access the JWT value from context cache in request functions (without passing in as params via the query key) to avoid repeated grabs from local storage

export const sendPostRequest = async <ResponseBodyShape>(
  URL: string,
  body: Record<string, any>
): Promise<ResponseBodyShape> => {
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
  return response.json() as Promise<ResponseBodyShape>;
};

export const sendGetRequest = async <ResponseBodyShape>(
  URL: string
): Promise<ResponseBodyShape> => {
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
  return response.json() as Promise<ResponseBodyShape>;
};

export const sendPatchRequest = async <ResponseBodyShape>(
  URL: string,
  body: {
    operation: "add" | "remove" | "replace";
    path: string;
    value: any;
  }
): Promise<ResponseBodyShape> => {
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
  return response.json() as Promise<ResponseBodyShape>;
};
