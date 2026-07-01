import mysql from "mysql2/promise";

const isLocal = process.env.NODE_ENV === "development";

export const pool = await mysql.createPool({
  host: isLocal ? process.env.DB_HOST_LOCAL : process.env.DB_HOST,
  user: isLocal ? process.env.DB_USER_LOCAL : process.env.DB_USER,
  port: isLocal ? process.env.DB_PORT_LOCAL : process.env.DB_PORT,
  password: isLocal ? process.env.DB_PASSWORD_LOCAL : process.env.DB_PASSWORD,
  database: isLocal ? process.env.DB_NAME_LOCAL : process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
