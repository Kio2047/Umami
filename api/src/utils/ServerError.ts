type ServerErrorMessages =
  | "invalid jwt"
  | "not authorised"
  | "invalid user id"
  | "no cloudinary API secret"
  | "no jwt secret"
  | "unknown"
  | "duplicate value";

type RequiredDataMap = {
  "duplicate value": { duplicateKey: string; duplicateVal: string };
};

type ServerErrorDataMap = RequiredDataMap & {
  [K in Exclude<ServerErrorMessages, keyof RequiredDataMap>]: Record<
    string,
    never
  >;
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
