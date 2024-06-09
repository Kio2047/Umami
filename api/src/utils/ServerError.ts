type ServerErrorMessages =
  | "missing jwt"
  | "malformed jwt"
  | "invalid jwt"
  | "invalid credentials"
  | "not authorised"
  | "invalid user id"
  | "invalid restaurant id"
  | "duplicate value";

type RequiredDataMap = {
  "duplicate value": {
    duplicateKey: string;
    duplicateVal: string;
    cause?: unknown;
    additionalInfo?: string;
  };
};

type ServerErrorDataMap = RequiredDataMap & {
  [K in Exclude<ServerErrorMessages, keyof RequiredDataMap>]: {
    cause?: unknown;
    additionalInfo?: string;
  };
};

export type ServerErrorUnion = {
  [K in ServerErrorMessages]: ServerError<K>;
}[ServerErrorMessages];

export class ServerError<T extends ServerErrorMessages> extends Error {
  public override readonly message: T;
  public readonly data: ServerErrorDataMap[T];
  constructor(message: T & keyof RequiredDataMap, data: ServerErrorDataMap[T]);
  constructor(
    message: Exclude<ServerErrorMessages, keyof RequiredDataMap>,
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
