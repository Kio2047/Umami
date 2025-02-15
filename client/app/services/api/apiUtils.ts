import { getJwt } from "../local-storage/authStorageService";

export class FailedRequestError extends Error {
  public readonly responseBody?: unknown;
  public readonly statusCode?: number;
  public readonly statusClass?: string;
  constructor(
    message?: string,
    optionalData?: {
      responseBody?: unknown;
      statusCode?: number;
      cause?: unknown;
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

export const parseJSON = async <T>(response: Response): Promise<T> => {
  try {
    return (await response.json()) as T;
  } catch (error: unknown) {
    throw new FailedRequestError(
      `Failed to parse JSON from response with status ${response.status}.`,
      { cause: error }
    );
  }
};

// TODO: access the JWT value from context cache in request functions (without passing in as params via the query key) to avoid repeated grabs from local storage

const requestTimeoutMs = 5000;

export const sendPOSTRequest = async <ResponseBody, RequestBody>(
  url: string,
  body: RequestBody
): Promise<ResponseBody> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);
  const jwt = await getJwt();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` })
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    const responseBody = await parseJSON<ResponseBody>(response);

    if (!response.ok) {
      throw new FailedRequestError(
        `${url} responded to POST request with an error`,
        {
          statusCode: response.status,
          responseBody
        }
      );
    }

    return responseBody;
  } catch (err) {
    if (err instanceof FailedRequestError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new FailedRequestError(
        `POST request to ${url} timed out after ${requestTimeoutMs}ms`
      );
    }
    throw new FailedRequestError(
      `Unsuccessfully attempted to send POST request to ${url}`,
      { cause: err }
    );
  } finally {
    clearTimeout(timeoutId);
  }
};

export const sendGETRequest = async <ResponseBody, RequestBody>(
  url: string
): Promise<ResponseBody> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);
  const jwt = await getJwt();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` })
      },
      signal: controller.signal
    });

    const responseBody = await parseJSON<ResponseBody>(response);

    if (!response.ok) {
      throw new FailedRequestError(
        `${url} responded to GET request with an error`,
        {
          statusCode: response.status,
          responseBody
        }
      );
    }

    return responseBody;
  } catch (err) {
    if (err instanceof FailedRequestError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new FailedRequestError(
        `GET request to ${url} timed out after ${requestTimeoutMs}ms`
      );
    }
    throw new FailedRequestError(
      `Unsuccessfully attempted to send GET request to ${url}`,
      { cause: err }
    );
  } finally {
    clearTimeout(timeoutId);
  }
};

export const sendPATCHRequest = async <
  ResponseBody,
  RequestBody extends {
    op: "add" | "remove" | "replace";
    path: string;
    value: string;
  }
>(
  url: string,
  body: RequestBody
): Promise<ResponseBody> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);
  const jwt = await getJwt();

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` })
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    const responseBody = await parseJSON<ResponseBody>(response);

    if (!response.ok) {
      throw new FailedRequestError(
        `${url} responded to PATCH request with an error`,
        {
          statusCode: response.status,
          responseBody
        }
      );
    }

    return responseBody;
  } catch (err) {
    if (err instanceof FailedRequestError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new FailedRequestError(
        `PATCH request to ${url} timed out after ${requestTimeoutMs}ms`
      );
    }
    throw new FailedRequestError(
      `Unsuccessfully attempted to send PATCH request to ${url}`,
      { cause: err }
    );
  } finally {
    clearTimeout(timeoutId);
  }
};
