import {
  getAllUsers,
  getCountDocuments,
  getUserByEmail,
  getUserById,
  getUserById2,
  registrarUser,
} from "../services/users.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { AppError } from "../errors/AppError.js";

export const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await getAllUsers();

    if (usuarios.length === 0)
      throw new AppError("No hay usuarios registrados", 404);

    res.status(200).json(usuarios);
  } catch (err) {
    next(err);
  }
};

export const buscarUsuarioId = async (req, res, next) => {
  try {
    const usuario = await getUserById(req.params.id);

    if (usuario.length === 0)
      throw new AppError("Usuario no encontrado - id", 404);

    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
};

export const buscarUsuarioEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const usuario = await getUserByEmail(email);

    if (usuario.length === 0)
      throw new AppError("Usuario no encontrado - email", 404);

    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
};

export const contarDocumentosUsuario = async (req, res, next) => {
  try {
    const total_documentos = await getCountDocuments();

    res.status(200).json(total_documentos);
  } catch (err) {
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
      throw new AppError("Faltan datos por completar", 400);

    const usuario = await getUserByEmail(email);

    if (usuario.length !== 0)
      throw new AppError("Usuario ya existente - try to login", 404);

    const hashedPassword = await bcrypt.hash(password, 10);

    const hash = crypto.createHash("sha256").update(email).digest("hex");
    const avatar_img = `https://www.gravatar.com/avatar/${hash}`;

    const usuarioRegistrado = await registrarUser({
      name,
      email,
      password: hashedPassword,
      role,
      avatar_img,
    });

    const token = jwt.sign(
      {
        id: usuarioRegistrado.id,
        email: usuarioRegistrado.email,
        role: usuarioRegistrado.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      },
    );

    res.status(200).json({ token, usuarioRegistrado });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new AppError("Debes rellenar email y password", 400);

    const existeUsuario = await getUserByEmail(email);
    if (existeUsuario.length === 0)
      throw new AppError("Usuario no registrado - try to signup", 404);

    const usuario = existeUsuario[0];

    const esContraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!esContraseñaValida) throw new AppError("Credenciales inválidas", 401);

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      },
    );

    res.status(200).json({
      message: "Inicio de sesión con éxito",
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        created_at: usuario.created_at,
        avatar_img: usuario.avatar_img,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const profile = async (req, res, next) => {
  try {
    const usuarioEncontrado = await getUserById2(req.user.id);

    if (usuarioEncontrado.length === 0)
      throw new AppError("Usuario no encontrado", 404);

    const { id, name, email, role, created_at, total_documentos, avatar_img } =
      usuarioEncontrado[0];

    res.status(200).json({
      usuario: {
        id,
        name,
        email,
        role,
        total_documentos,
        created_at,
        avatar_img,
      },
    });
  } catch (err) {
    next(err);
  }
};
