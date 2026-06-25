import { Router } from "express";
import {
  obtenerTodaLista,
  crearDocumento,
  actualizarDocumento,
  obtenerDocumentoId,
  obtenerDocumentosPorIdUsuario,
  eliminarDocumento,
  totalDoc,
  obtenerDocumentosPublicos,
  obtenerDocumentoPublicoPorId,
  aumentarLikes,
} from "../controllers/lista.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadPhotoMiddleware } from "../middlewares/uploadPhotoMiddleware.js";

const router = Router();

router.get("/lista", obtenerTodaLista);
router.get("/lista/total", totalDoc);
router.get("/lista/publicDocs", obtenerDocumentosPublicos);
router.get("/lista/publicDocs/:id", obtenerDocumentoPublicoPorId);
router.get("/lista/:id", obtenerDocumentoId);

router.post("/lista/docs", authMiddleware, obtenerDocumentosPorIdUsuario);
router.post("/lista", authMiddleware, uploadPhotoMiddleware, crearDocumento);

router.put(
  "/lista/:id",
  authMiddleware,
  uploadPhotoMiddleware,
  actualizarDocumento,
);
router.put("/lista/likes/:id", authMiddleware, aumentarLikes);

router.delete("/lista/:id", authMiddleware, eliminarDocumento);

export default router;
