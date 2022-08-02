import express from "express";
import multer from "multer"

// forget about local storage with multer - leverage the cloud and upload photos to cloudinary

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}.jpg`);
  },
});

export const upload = multer({ storage });

// export const uploadImages = upload.array