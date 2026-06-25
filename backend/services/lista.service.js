import { pool } from "../db/connection.js";

export const getAllLista = async () => {
  const [rows] = await pool.query("select * from documentos");

  return rows;
};

export const getDocumentById = async (id) => {
  const [rows] = await pool.query("select * from documentos where id = ?", [
    id,
  ]);

  return rows;
};

export const getTotalDoc = async () => {
  const [rows] = await pool.query(
    "select count(*) as total_documentos from documentos",
  );

  return rows[0].total_documentos;
};

export const getPublicDocs = async () => {
  const [rows] = await pool.query(`
      select d.id, d.title, d.subtitle, d.body, d.status, d.created_at, u.id as user_id, u.name, u.email, u.role, u.avatar_img
      from documentos d
      left join users u on d.user_id = u.id
      where d.status = 'publicado'
    `);
  return rows;
};
export const getPublicDocsById = async (id) => {
  const [rows] = await pool.query(
    `
      select d.id, d.title, d.subtitle, d.body, d.status, d.created_at, u.id as user_id, u.name, u.email, u.role, u.avatar_img
      from documentos d
      left join users u on d.user_id = u.id
      where d.id = ? AND d.status = 'publicado'
    `,
    [id],
  );
  return rows[0];
};

export const getDocumentsByUserId = async (user_id) => {
  const [rows] = await pool.query(
    `select id, title, subtitle, body, status from documentos where user_id = ?`,
    [user_id],
  );

  return rows;
};

export const createDocument = async ({
  title,
  subtitle,
  body,
  status,
  user_id,
  image,
}) => {
  const [result] = await pool.query(
    "insert into documentos (title, subtitle, body, status, user_id, image) values (?, ?, ?, ?, ?, ?)",
    [title, subtitle, body, status, user_id, image],
  );

  return {
    message: "Documento creado correctamente",
    documento: {
      id: result.insertId,
      title,
      subtitle,
      body,
      status,
      user_id,
      image,
    },
  };
};

export const increaseLikes = async (id) => {
  const [result] = await pool.query(
    `update documentos set likes = likes + 1 where id  ?`,
    [id],
  );
  return {
    message: `Documento ${id} ha aumentado en +1 like`,
    id,
    result,
  };
};

export const updateDocument = async (id, { title, subtitle, body, status }) => {
  const [result] = await pool.query(
    "update documentos set title = ?, subtitle = ?, body = ?, status = ? where id = ?",
    [title, subtitle, body, status, id],
  );

  return {
    message: "Documento actualizado correctamente",
    documento: {
      id: result.insertId,
      title,
      subtitle,
      body,
      status,
    },
  };
};

export const deleteDocument = async (id) => {
  const [result] = await pool.query("delete from documentos where id = ?", [
    id,
  ]);

  return {
    message: "Documento eliminado correctamente",
    id,
  };
};
