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

router.post("/lista", uploadPhotoMiddleware, crearDocumento);

router.put("/lista/:id", actualizarDocumento);

router.delete("/lista/:id", eliminarDocumento);

export default router;
