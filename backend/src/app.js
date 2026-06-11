import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import rateLimit from "express-rate-limit";

import listaRoutes from "../routes/lista.routes.js";
import userRoutes from "../routes/users.routes.js";

import { errorHandler } from "../middlewares/error.js";
import { notFound } from "../middlewares/notFound.js";

const app = express();

const swaggerDocument = YAML.load("./src/docs/openapi.yaml");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 100 peticiones cada 15 minutos por IP
  max: 100,
  message: { message: "Demasiadas peticiones. Inténtalo más tarde" },
});
// app.use(globalLimiter);

app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", listaRoutes);
app.use("/api", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
