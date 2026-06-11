export const errorHandler = async (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error en el servidor";

  res.status(statusCode).json({ error: message });
};
