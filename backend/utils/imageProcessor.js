import sharp from "sharp";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper: sube un buffer a Cloudinary y devuelve la URL segura
function uploadBuffer(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        folder: "photos",
        resource_type: "image",
        format: "webp",
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}

export async function processDocumentImage(file) {
  if (!file) return null;

  const id = crypto.randomUUID();

  // Procesar imagen principal con sharp → buffer
  const mainBuffer = await sharp(file.buffer)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  // Procesar thumbnail con sharp → buffer
  const thumbBuffer = await sharp(file.buffer)
    .rotate()
    .resize({
      width: 600,
      height: 400,
      fit: "cover",
      position: "attention",
      withoutEnlargement: true,
    })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  // Subir ambos a Cloudinary en paralelo
  const [imageUrl, thumbUrl] = await Promise.all([
    uploadBuffer(mainBuffer, id),
    uploadBuffer(thumbBuffer, `thumb_${id}`),
  ]);

  return {
    image: imageUrl, // https://res.cloudinary.com/tu_cloud/image/upload/photos/uuid.webp
    image_thumb: thumbUrl, // https://res.cloudinary.com/tu_cloud/image/upload/photos/thumb_uuid.webp
  };
}
