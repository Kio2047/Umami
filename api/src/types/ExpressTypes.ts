import { Request, Response } from "express";

export type TypedRequest<
  ReqBody extends Record<string, any>,
  ReqQuery extends Record<string, string> = Record<string, never>,
  ReqParams extends Record<string, string> = Record<string, never>
> = Request<ReqParams, any, ReqBody, ReqQuery>;

export type TypedResponse<
  ResBody extends Record<string, any>,
  Locals extends Record<string, any> = Record<string, never>
> = Response<ResBody, Locals>;
