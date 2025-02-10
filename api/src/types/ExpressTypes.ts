import { Request, Response } from "express";
import { z } from "zod";
import { responseSchema, tokenPayloadSchema } from "../validations";

export type ResponseData = z.infer<typeof responseSchema>;

type TokenPayload = z.infer<typeof tokenPayloadSchema>;

export type CustomRequest<
  ReqBody extends Record<string, any> = Record<string, never>,
  ReqQuery extends Record<string, string> = Record<string, never>,
  ReqParams extends Record<string, string> = Record<string, never>
> = Request<ReqParams, any, ReqBody, ReqQuery>;

type CustomResponse<
  ResBody extends Record<string, any> = Record<string, never>,
  Locals extends Record<string, any> = Record<string, never>
> = Response<ResBody, Locals>;

export type PublicMiddlewareResponse = CustomResponse<ResponseData["body"]>;

export type PrivateMiddlewareResponse = CustomResponse<
  ResponseData["body"],
  {
    tokenPayload: TokenPayload;
  }
>;
