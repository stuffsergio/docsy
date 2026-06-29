import "dotenv/config";
import app from "./app.js";
import { pool } from "../db/connection.js";

const PORT = process.env.PORT || 3000;

async function testConnection() {
  const [rows] = await pool.query("select 1 + 1 as result");
  console.log("Conexión MySQL establecida: " + rows[0].result);
}
testConnection();

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor running at localhost:", PORT);
  console.log(process.env.FRONTEND_URL);
});
