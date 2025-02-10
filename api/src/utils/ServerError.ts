type ServerErrorMessages =
  | "not found"
  | "missing jwt"
  | "malformed jwt"
  | "invalid jwt"
  | "invalid credentials"
  | "not authorised"
  | "invalid user id"
  | "invalid restaurant id"
  | "duplicate value"
  | "cloudinary error"
  | "validation error"
  | "invalid operation"
  | "sensitive information leak"
  | "invalid response data format";

type OptionalData = {
  cause?: unknown;
  additionalInfo?: string;
};

type RequiredDataMap = {
  "validation error": {
    errors: Record<string | number | symbol, string[] | undefined>;
  };

  "duplicate value": {
    duplicateKey: string;
    duplicateVal: string;
  };

  "invalid operation": {
    operation: string;
  };

  "sensitive information leak": {
    sensitiveFields: string[];
  };
};

type ServerErrorDataMap = {
  [K in keyof RequiredDataMap]: RequiredDataMap[K] & OptionalData;
} & {
  [K in Exclude<ServerErrorMessages, keyof RequiredDataMap>]: OptionalData;
};

export type ServerErrorUnion = {
  [K in ServerErrorMessages]: ServerError<K>;
}[ServerErrorMessages];

export class ServerError<T extends ServerErrorMessages> extends Error {
  public override readonly message: T;
  public readonly data: ServerErrorDataMap[T];
  constructor(message: T & keyof RequiredDataMap, data: ServerErrorDataMap[T]);
  constructor(
    message: T & Exclude<ServerErrorMessages, keyof RequiredDataMap>,
    data?: ServerErrorDataMap[T]
  );
  constructor(message: T, data: ServerErrorDataMap[T]) {
    super();
    this.message = message;
    this.data = data;
  }
  get name(): string {
    return "ServerError";
  }
}
