import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import mysql from "mysql2/promise";

// ─── Configuración ───────────────────────────────────────────────
cloudinary.config({
  cloud_name: "TU_CLOUD_NAME",
  api_key: "TU_API_KEY",
  api_secret: "TU_API_SECRET",
});

const db = await mysql.createConnection({
  host: "reseau.proxy.rlwy.net",
  port: 15400,
  user: "root",
  password: "ytifmjTMPOhtaQgbtvRDseKELNRkvlaZ",
  database: "railway",
});

// Ruta local donde tienes las imágenes
const uploadDir = path.join(process.cwd(), "src", "uploads", "photos");
// ─────────────────────────────────────────────────────────────────

function uploadFileToCloudinary(filePath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
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
  });
}

// Extrae el nombre de archivo desde la ruta guardada en BD
// Ej: /uploads/photos/uuid.webp → uuid.webp
function extractFileName(dbPath) {
  return path.basename(dbPath);
}

async function migrate() {
  console.log("🚀 Iniciando migración de imágenes a Cloudinary...\n");

  const [rows] = await db.query(
    "SELECT id, image, image_thumb FROM documentos WHERE image IS NOT NULL",
  );

  console.log(`📋 ${rows.length} documentos con imagen encontrados\n`);

  let ok = 0;
  let errors = 0;

  for (const row of rows) {
    try {
      const imageName = extractFileName(row.image);
      const thumbName = extractFileName(row.image_thumb);

      const imagePath = path.join(uploadDir, imageName);
      const thumbPath = path.join(uploadDir, thumbName);

      // Verificar que los archivos existen antes de subir
      await fs.access(imagePath);
      await fs.access(thumbPath);

      // Subir ambas imágenes a Cloudinary en paralelo
      const publicId = imageName.replace(".webp", "");
      const thumbPublicId = thumbName.replace(".webp", "");

      const [imageUrl, thumbUrl] = await Promise.all([
        uploadFileToCloudinary(imagePath, publicId),
        uploadFileToCloudinary(thumbPath, thumbPublicId),
      ]);

      // Actualizar la BD de Railway con las nuevas URLs
      await db.query(
        "UPDATE documentos SET image = ?, image_thumb = ? WHERE id = ?",
        [imageUrl, thumbUrl, row.id],
      );

      console.log(`✅ Doc ID ${row.id} → OK`);
      console.log(`   image:       ${imageUrl}`);
      console.log(`   image_thumb: ${thumbUrl}\n`);
      ok++;
    } catch (error) {
      console.error(`❌ Doc ID ${row.id} → ERROR: ${error.message}\n`);
      errors++;
    }
  }

  console.log("─────────────────────────────────────");
  console.log(`✅ Migrados correctamente: ${ok}`);
  console.log(`❌ Errores: ${errors}`);
  console.log("─────────────────────────────────────");

  await db.end();
}

migrate();

// EJECUTA node migrate-images.mjs
/*

3 — Qué hace exactamente

Conecta a Railway directamente por el proxy TCP
Lee todos los documentos que tienen imagen en la BD
Por cada documento sube la imagen y el thumb a Cloudinary desde tu disco local
Actualiza los registros en Railway con las nuevas URLs (https://res.cloudinary.com/...)
Muestra un log de cada documento procesado y un resumen final


4 — Después de ejecutarlo
Verifica en DBeaver que las columnas image e image_thumb ya muestran URLs de Cloudinary en lugar de /uploads/photos/.... Si todo está bien, ya puedes hacer el redeploy de tu app con el nuevo código de imageProcessor.js y deleteImage.js que te di antes.
¿Quieres que también te ayude a verificar que el frontend está mostrando las imágenes correctamente una vez migradas?

*/
