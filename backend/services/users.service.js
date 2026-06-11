import { pool } from "../db/connection.js";

export const getAllUsers = async () => {
  const [rows] = await pool.query("select * from users");

  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query("select * from users where id = ?", [id]);

  return rows;
};

export const getUserById2 = async (id) => {
  const [rows] = await pool.query(
    `
      select u.id, u.name, u.email, u.role, count(d.id) as total_documentos, u.created_at, u.avatar_img
      from users u
      left join documentos d on u.id = d.user_id
      where u.id = ?
    `,
    [id],
  );

  return rows;
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("select * from users where email = ?", [
    email,
  ]);

  return rows;
};

export const getCountDocuments = async () => {
  const [rows] = await pool.query(
    `
      select u.id, u.name, u.email, count(d.id) as total_documentos 
      from users u
      left join documentos d on u.id = d.user_id
      group by u.id
    `,
  );

  return rows;
};

export const registrarUser = async ({
  name,
  email,
  password,
  role,
  avatar_img,
}) => {
  const [result] = await pool.query(
    "insert into users (name, email, password, role, avatar_img) values (?, ?, ?, ?, ?)",
    [name, email, password, role, avatar_img],
  );

  return {
    message: "Usuario registrado exitosamente",
    id: result.insertId,
    usuario: {
      name,
      email,
      role,
      avatar_img,
    },
  };
};
