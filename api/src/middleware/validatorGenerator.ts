import { z } from "zod";
import { RequestHandler } from "express";
import { ServerError } from "../utils/ServerError";

const validatorGenerator = (schemas: {
  body?: z.ZodObject<any>;
  params?: z.ZodObject<any>;
  query?: z.ZodObject<any>;
}): RequestHandler => {
  const validator: RequestHandler = (req, res, next) => {
    try {
      const requestSchema = z.object({
        body: schemas.body ?? z.object({}),
        params: schemas.params ?? z.object({}),
        query: schemas.query ?? z.object({})
      });

      const result = requestSchema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query
      });

      if (!result.success) {
        throw new ServerError("validation error", {
          errors: result.error.flatten().fieldErrors
        });
      }
      req.body = result.data.body;
      req.params = result.data.params;
      req.query = result.data.query;

      next();
    } catch (err) {
      next(err);
    }
  };
  return validator;
};

export default validatorGenerator;
