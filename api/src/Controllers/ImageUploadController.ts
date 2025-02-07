import { NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";

import envVars from "../envConfig";
import {
  CustomRequest as Request,
  PrivateControllerResponse as Response
} from "../types/ExpressTypes";
import { ServerError } from "../utils/ServerError";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET
});

const generateCloudinarySignature = function (folder: "user_profile_images") {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      timestamp
    },
    envVars.CLOUDINARY_API_SECRET
  );

  return {
    timestamp,
    signature
  };
};

export const generateProfileImageUploadSignature = async function (
  req: Request<Record<string, never>>,
  res: Response,
  next: NextFunction
) {
  try {
    const { timestamp, signature } = generateCloudinarySignature(
      "user_profile_images"
    );
    res.locals.responseData = {
      status: 200,
      body: {
        status: "success",
        message: "signature successfully generated",
        data: { timestamp, signature }
      }
    };
    next();
  } catch (err) {
    next(new ServerError("cloudinary error", { cause: err }));
  }
};
