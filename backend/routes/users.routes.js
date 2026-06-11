import { Router } from "express";
import {
  listarUsuarios,
  buscarUsuarioId,
  buscarUsuarioEmail,
  signup,
  login,
  profile,
  contarDocumentosUsuario,
} from "../controllers/users.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { loginLimiter } from "../middlewares/rate-limit.js";

const router = Router();

router.get("/users", listarUsuarios);
router.get("/users/documentos", contarDocumentosUsuario);
router.get("/users/:id", buscarUsuarioId);

router.post("/users/signup", signup);
router.post("/users/login", loginLimiter, login);
router.post("/users/profile", authMiddleware, profile);

export default router;
