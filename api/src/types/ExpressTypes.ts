import { Request, Response } from "express";

export type CustomRequest<
  ReqBody extends Record<string, any>,
  ReqQuery extends Record<string, string> = Record<string, never>,
  ReqParams extends Record<string, string> = Record<string, never>
> = Request<ReqParams, any, ReqBody, ReqQuery>;

export type CustomResponse<
  ResBody extends Record<string, any>,
  Locals extends Record<string, any> = Record<string, never>
> = Response<ResBody, Locals>;

export interface TokenPayload {
  sub: string;
  iat: number;
}

export type CustomProtectedResponse<ResBody extends Record<string, any>> =
  CustomResponse<
    ResBody,
    {
      tokenPayload: TokenPayload;
    }
  >;
