import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

const authMiddlware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token no proporcionado", 401);

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token)
    throw new AppError("Estructura de token inválida", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Token expirado", 401));
    }

    if (err.name === "JsonWebTokenError") {
      return next(new AppError("Token inválido", 401));
    }

    console.log("Usuario no autenticado");
    return next(err);
  }
};

export default authMiddlware;
