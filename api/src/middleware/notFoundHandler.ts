import { RequestHandler } from "express";
import { ServerError } from "../utils/ServerError";

const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new ServerError("not found"));
};

export default notFoundHandler;
