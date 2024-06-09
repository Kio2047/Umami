import { envVars } from "#src/envConfig";
import { v2 as cloudinary } from "cloudinary";
import { RequestHandler } from "express";

export const generateMediaUploadSignature: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const cloudinarySecret = envVars.CLOUDINARY_API_KEY;
    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        folder: "user_profile_images",
        timestamp
      },
      cloudinarySecret
    );

    res.status(200).json({ data: { timestamp, signature } });
  } catch (err) {
    next(err);
  }
};
