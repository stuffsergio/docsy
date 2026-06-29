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
  likeContadorControl,
  unlikeControl,
  obtenerLikesUsuario,
} from "../controllers/lista.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadPhotoMiddleware } from "../middlewares/uploadPhotoMiddleware.js";

const router = Router();

// CRUD - GETTERS
router.get("/lista", obtenerTodaLista);
router.get("/lista/total", totalDoc);
router.get("/lista/publicDocs", obtenerDocumentosPublicos);
router.get("/lista/publicDocs/:id", obtenerDocumentoPublicoPorId);
router.get("/lista/:id", obtenerDocumentoId);

router.post("/lista/docs", authMiddleware, obtenerDocumentosPorIdUsuario);

// CRUD - POST, PUT, DELETE
router.post("/lista", authMiddleware, uploadPhotoMiddleware, crearDocumento);
router.put(
  "/lista/:id",
  authMiddleware,
  uploadPhotoMiddleware,
  actualizarDocumento,
);
router.delete("/lista/:id", authMiddleware, eliminarDocumento);

// GESTION LIKES - RED SOCIAL
router.get("/lista/lista/likes", authMiddleware, obtenerLikesUsuario);
router.post("/lista/likes/:id", authMiddleware, likeContadorControl);
router.delete("/lista/likes/:id", authMiddleware, unlikeControl);

export default router;
