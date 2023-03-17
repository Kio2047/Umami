export class FailedRequestError extends Error {
  public statusCode?: number;
  public responseBody?: any;
  constructor(
    message?: string,
    optionalData?: {
      statusCode?: number;
      responseBody?: any;
    }
  ) {
    super(message);
    this.statusCode = optionalData?.statusCode;
    this.responseBody = optionalData?.responseBody;
    this.name = "FailedRequestError";
  }
}

export const sendPostRequest = async (
  URL: string,
  body: Record<string, any>
): Promise<Response> => {
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
  return response;
};
