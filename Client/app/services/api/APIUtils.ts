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

export const sendPostRequest = async <ResponseBodyShape>(
  URL: string,
  body: Record<string, any>
): Promise<ResponseBodyShape> => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
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
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      Accept: "application/json"
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
