import { Request, Response } from "express";
import { z } from "zod";
import { responseSchema } from "./schemas";

type ResponseData = z.infer<typeof responseSchema>;

export type CustomRequest<
  ReqBody extends Record<string, any> = Record<string, never>,
  ReqQuery extends Record<string, string> = Record<string, never>,
  ReqParams extends Record<string, string> = Record<string, never>
> = Request<ReqParams, any, ReqBody, ReqQuery>;

type CustomResponse<
  ResBody extends Record<string, any> = Record<string, never>,
  Locals extends Record<string, any> = Record<string, never>
> = Response<ResBody, Locals>;

export type PublicMiddlewareResponse = CustomResponse;

export type PrivateMiddlewareResponse = CustomResponse<
  never,
  {
    tokenPayload: TokenPayload;
  }
>;

export type PublicControllerResponse = CustomResponse<
  never,
  { responseData: ResponseData }
>;

export type PrivateControllerResponse = CustomResponse<
  never,
  {
    tokenPayload: TokenPayload;
  } & { responseData: ResponseData }
>;

export type ResponseSenderResponse = CustomResponse<
  ResponseData["body"],
  {
    responseData: ResponseData;
  }
>;

export interface TokenPayload {
  sub: string;
  iat: number;
}
