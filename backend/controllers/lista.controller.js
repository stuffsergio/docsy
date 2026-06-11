import { AppError } from "../errors/AppError.js";
import {
  createDocument,
  deleteDocument,
  getAllLista,
  getDocumentById,
  getPublicDocs,
  getDocumentsByUserId,
  getTotalDoc,
  updateDocument,
  getPublicDocsById,
} from "../services/lista.service.js";

export const obtenerTodaLista = async (req, res, next) => {
  try {
    const data = await getAllLista();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const obtenerDocumentoId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const documento = await getDocumentById(id);

    if (documento.length === 0)
      return res.status(404).json({ message: `No existe doc. con id ${id}` });

    console.log(documento);
    res.status(200).json(documento);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const totalDoc = async (req, res, next) => {
  try {
    const total = await getTotalDoc();

    console.log(total);

    res.status(200).json(total);
  } catch (err) {
    next(err);
  }
};

export const obtenerDocumentosPublicos = async (req, res, next) => {
  try {
    const docs = await getPublicDocs();
    console.log(docs);
    res.status(200).json(docs);
  } catch (err) {
    next(err);
  }
};
export const obtenerDocumentoPublicoPorId = async (req, res, next) => {
  try {
    const doc = await getPublicDocsById(req.params.id);
    console.log(doc);
    res.status(200).json(doc);
  } catch (err) {
    next(err);
  }
};

export const obtenerDocumentosPorIdUsuario = async (req, res, next) => {
  try {
    console.log(req.user);
    const documentosUsuario = await getDocumentsByUserId(req.user.id);

    if (documentosUsuario.length === 0) return res.status(200).json([]);
    console.log(documentosUsuario);

    const { id, name, email, total_documentos, title, subtitle, body, status } =
      documentosUsuario[0];

    res.status(200).json(documentosUsuario);
  } catch (err) {
    next(err);
  }
};

export const crearDocumento = async (req, res, next) => {
  const { title, subtitle, body, status, user_id } = req.body;
  console.log(title, subtitle, body, status, user_id);
  try {
    const documento = await createDocument({
      title,
      subtitle,
      body,
      status,
      user_id,
    });
    console.log(documento);
    res.status(200).json(documento);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const actualizarDocumento = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, subtitle, body, status } = req.body;

    const documento = await getDocumentById(id);

    if (documento.length === 0)
      return res.status(404).json({ message: `No existe doc. con id ${id}` });
    console.log("Documento anterior que se ha pedido actualizar");
    console.log(documento);

    const documentoActualizado = await updateDocument(id, {
      title,
      subtitle,
      body,
      status,
    });
    console.log("Documento nuevo actualizado");
    console.log(documentoActualizado);
    res.status(200).json(documentoActualizado);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const eliminarDocumento = async (req, res, next) => {
  try {
    const doc = await deleteDocument(req.params.id);
    console.log("Documento eliminado");
    console.log(doc);
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
