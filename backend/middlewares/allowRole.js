import { AppError } from "../errors/AppError.js";

export const allowRoles = async (...roles) => {
  return (req, res, next) => {
    if (!req.user) throw new AppError("Usuario no autenticado", 401);

    if (!req.user.role.includes(...roles))
      throw new AppError("No tienes permisos para realizar esta acción", 409);

    next();
  };
};
