type ResponseErrorMessages =
  | "invalid response data format"
  | "sensitive information leak";

type OptionalData = {
  cause?: unknown;
  additionalInfo?: string;
};

type RequiredDataMap = {
  "sensitive information leak": {
    sensitiveFields: string[];
  };
};

type ResponseErrorDataMap = {
  [K in keyof RequiredDataMap]: RequiredDataMap[K] & OptionalData;
} & {
  [K in Exclude<ResponseErrorMessages, keyof RequiredDataMap>]: OptionalData;
};

export class ResponseError<T extends ResponseErrorMessages> extends Error {
  public override readonly message: T;
  public readonly data: ResponseErrorDataMap[T];
  constructor(
    message: T & keyof RequiredDataMap,
    data: ResponseErrorDataMap[T]
  );
  constructor(
    message: T & Exclude<ResponseErrorMessages, keyof RequiredDataMap>,
    data?: ResponseErrorDataMap[T]
  );
  constructor(message: T, data: ResponseErrorDataMap[T]) {
    super();
    this.message = message;
    this.data = data;
  }
  get name(): string {
    return "ResponseError";
  }
}
