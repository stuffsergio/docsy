export const notFound = async (req, res) => {
  res.status(400).json({ error: "Ruta no encontrada, revisa compi ☝️" });
};
