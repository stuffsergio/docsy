import { pool } from "../db/connection.js";
import { deleteImage } from "../utils/deleteImage.js";

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

export const getPublicDocs = async (userId) => {
  const [rows] = await pool.query(
    `
      select d.id, d.title, d.subtitle, d.body, d.status, d.created_at, d.likes, d.image, d.image_thumb, u.id as user_id, u.name, u.email, u.role, u.avatar_img,
      
      case
        when dl.id is not null then 1
        else 0
      end as user_liked
      
      from documentos d
      left join users u on d.user_id = u.id

      left join document_likes dl
      
      on d.id = dl.document_id
      and dl.user_id = ?

      where d.status = 'publicado'
    `,
    [userId],
  );
  return rows;
};
export const getPublicDocsById = async (id, userId) => {
  const [rows] = await pool.query(
    `
      select d.*, u.id as user_id, u.name, u.email, u.role, u.avatar_img,
      
      case
        when dl.id is not null then 1
        else 0
      end as user_liked
      
      from documentos d
      left join users u on d.user_id = u.id

      left join document_likes dl

      on d.id = dl.document_id
      and dl.user_id = ?

      where d.id = ? AND d.status = 'publicado'
    `,
    [userId, id],
  );
  return rows[0];
};

export const getDocumentsByUserId = async (user_id) => {
  const [rows] = await pool.query(
    `select id, title, subtitle, body, status, likes, image, image_thumb from documentos where user_id = ?`,
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
  image_thumb,
}) => {
  const [result] = await pool.query(
    "insert into documentos (title, subtitle, body, status, user_id, likes, image, image_thumb) values (?, ?, ?, ?, ?, 0, ?, ?)",
    [title, subtitle, body, status, user_id, image, image_thumb],
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
      image_thumb,
    },
  };
};

export const updateDocument = async (
  id,
  { title, subtitle, body, status, image, image_thumb },
) => {
  const documentoAnterior = await getDocumentById(id);

  if (documentoAnterior.length === 0) return null;

  const oldImage = documentoAnterior[0].image;
  const oldThumb = documentoAnterior[0].image_thumb;

  let query = `
    update documentos
    set title = ?, subtitle = ?, body = ?, status = ?
    `;

  let values = [title, subtitle, body, status];

  if (image) {
    query += ", image = ?, image_thumb = ?";
    values.push(image, image_thumb);
  }

  query += " where id = ?";
  values.push(id);

  const [result] = await pool.query(query, values);

  // Eliminimos las images antiguas solo después de actualizar
  if (image) {
    await deleteImage(oldImage);
    await deleteImage(oldThumb);
  }

  return {
    message: "Documento actualizado correctamente",
    documento: {
      id,
      title,
      subtitle,
      body,
      status,
      image,
      image_thumb,
    },
  };
};

export const deleteDocument = async (id) => {
  const documento = await getDocumentById(id);
  if (documento.length === 0) return null;

  const { image, image_thumb } = documento[0];

  const [result] = await pool.query("delete from documentos where id = ?", [
    id,
  ]);

  await deleteImage(image);
  await deleteImage(image_thumb);

  return {
    message: "Documento eliminado correctamente",
    id,
  };
};

// GESTIÓN DE LIKES - RED SOCIAL
export const likeDocument = async (documentId, userId) => {
  const [exists] = await pool.query(
    `
    select * from document_likes where user_id = ? and document_id = ?
  `,
    [userId, documentId],
  );

  if (exists.length > 0) {
    return { message: "Ya existe ese like" };
  }

  // relac. usuario-documento
  await pool.query(
    `
        insert into document_likes(user_id, document_id) values(?, ?)
      `,
    [userId, documentId],
  );

  // aumentar contador likes
  await pool.query(
    `
        update documentos set likes = likes + 1 where id = ?
      `,
    [documentId],
  );

  return {
    message: "Like guardado",
    documentId,
    userId,
  };
};

export const getUserLikedDocuments = async (userId) => {
  const [rows] = await pool.query(
    `
        select documentos.* from documentos
        inner join document_likes
        on documentos.id = document_likes.document_id
        where document_likes.user_id = ?
      `,
    [userId],
  );

  return rows;
};

export const unlikeDocument = async (documentId, userId) => {
  await pool.query(
    `
      delete from document_likes
      where user_id = ?
      and document_id = ?
    `,
    [userId, documentId],
  );

  await pool.query(
    `
        update documentos set likes = likes - 1
        where id = ?
      `,
    [documentId],
  );

  return {
    message: "Document unliked",
    documentId,
    userId,
  };
};
