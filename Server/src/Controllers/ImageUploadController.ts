import { v2 as cloudinary } from "cloudinary";
import { RequestHandler } from "express";

export const generateMediaUploadSignature: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error(
        "No CLOUDINARY_API_SECRET value exists in process environment",
        {
          cause: "no cloudinary API secr!et"
        }
      );
    }
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        folder: "user_profile_images",
        timestamp
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({ data: { timestamp, signature } });
  } catch (err) {
    next(err);
  }
};
