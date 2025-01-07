import { Request, Response } from "express";

export type CustomRequest<
  ReqBody extends Record<string, any> = Record<string, unknown>,
  ReqQuery extends Record<string, string> = Record<string, never>,
  ReqParams extends Record<string, string> = Record<string, never>
> = Request<ReqParams, any, ReqBody, ReqQuery>;

export type CustomResponse<
  ResBody extends Record<string, any>,
  Locals extends Record<string, any> = Record<string, never>
> = Response<ResBody, Locals>;

export type ApiResponse<
  Locals extends Record<string, any> = Record<string, never>
> = CustomResponse<
  {
    status: "success" | "error";
    message: string;
    data?: Record<string, any>;
  },
  Locals
>;

export type ProtectedApiResponse = ApiResponse<{
  tokenPayload: TokenPayload;
}>;

export interface TokenPayload {
  sub: string;
  iat: number;
}
