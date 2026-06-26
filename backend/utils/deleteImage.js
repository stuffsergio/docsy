import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "src", "uploads", "photos");

export async function deleteImage(fileName) {
  if (!fileName) return;

  const filePath = path.join(uploadDir, fileName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Error eliminando imagen: ", error);
    }
  }
}
