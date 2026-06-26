import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const uploadDir = path.join(process.cwd(), "src", "uploads", "photos");

async function ensureUploadFolder() {
  await fs.mkdir(uploadDir, {
    recursive: true,
  });
}

export async function processDocumentImage(file) {
  if (!file) return null;

  await ensureUploadFolder();

  const id = crypto.randomUUID();

  const imageName = `${id}.webp`;
  const thumbName = `thumb_${id}.webp`;

  const imagePath = path.join(uploadDir, imageName);
  const thumbPath = path.join(uploadDir, thumbName);

  // Imagen ppal - 1200px ancho máx
  await sharp(file.buffer)
    .rotate()
    .resize({
      width: 1200,
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 6,
    })
    .toFile(imagePath);

  // Thumbnail - 600x400
  await sharp(file.buffer)
    .rotate()
    .resize({
      width: 600,
      height: 400,
      fit: "cover",
      position: "attention",
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
      effort: 6,
    })
    .toFile(thumbPath);

  return {
    image: `/uploads/photos/${imageName}`,
    image_thumb: `/uploads/photos/${thumbName}`,
  };
}
