import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  try {
    // Extrae el public_id desde la URL de Cloudinary
    // Ejemplo URL: https://res.cloudinary.com/cloud/image/upload/v123/photos/thumb_uuid.webp
    const matches = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    if (!matches) return;

    const publicId = matches[1]; // → "photos/thumb_uuid"
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error eliminando imagen de Cloudinary:", error);
  }
}
