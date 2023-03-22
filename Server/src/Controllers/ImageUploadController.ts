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
        folder: "user_profile_pictures",
        timestamp
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({ timestamp, signature });
  } catch (err) {
    next(err);
  }
};

// res.json("hello2!");

// import express from "express";
// import multer from "multer"

// // forget about local storage with multer - leverage the cloud and upload photos to cloudinary

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, './images');
//   },
//   filename(req, file, callback) {
//     callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}.jpg`);
//   },
// });

// export const upload = multer({ storage });

// // export const uploadImages = upload.array
