import multer from "multer";
import { uploadPhoto } from "../config/multer.config.js";

export const uploadPhotoMiddleware = (req, res, next) => {
  const upload = uploadPhoto.single("image");

  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "La imagen no puede superar los 2 MB" });
      }
    }

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    console.log("BODY MULTER:", req.body);
    console.log("FILE MULTER:", req.file);

    next();
  });
};
