import { NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import envVars from "../envConfig";
import {
  CustomRequest as Request,
  PrivateMiddlewareResponse as Response
} from "../types/ExpressTypes";
import { ServerError } from "../utils/ServerError";
import { getImageUploadSignatureSchema } from "../Modules/validations";
import sendResponse from "../utils/sendResponse";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET
});

export const generateImageUploadSignature = async function (
  req: Request<
    never,
    never,
    z.infer<typeof getImageUploadSignatureSchema.params>
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const { folder } = req.params;
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp
      },
      envVars.CLOUDINARY_API_SECRET
    );
    sendResponse(res, {
      status: 200,
      body: {
        status: "success",
        message: "Upload signature successfully generated",
        data: { timestamp, signature }
      }
    });
  } catch (err) {
    next(new ServerError("cloudinary error", { cause: err }));
  }
};
