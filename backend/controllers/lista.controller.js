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
  likeDocument,
  unlikeDocument,
  getUserLikedDocuments,
} from "../services/lista.service.js";
import { processDocumentImage } from "../utils/imageProcessor.js";

export const obtenerTodaLista = async (req, res, next) => {
  try {
    const data = await getAllLista();
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

    res.status(200).json(documento);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const totalDoc = async (req, res, next) => {
  try {
    const total = await getTotalDoc();
    res.status(200).json(total);
  } catch (err) {
    next(err);
  }
};

export const obtenerDocumentosPublicos = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const docs = await getPublicDocs(userId);
    res.status(200).json(docs);
  } catch (err) {
    next(err);
  }
};
export const obtenerDocumentoPublicoPorId = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const doc = await getPublicDocsById(req.params.id, userId);
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

    const { id, name, email, total_documentos, title, subtitle, body, status } =
      documentosUsuario[0];

    res.status(200).json(documentosUsuario);
  } catch (err) {
    next(err);
  }
};

export const aumentarLikes = async (req, res, next) => {
  try {
    const documentoEncontrado = await getDocumentById(req.params.id);
    if (documentoEncontrado.length === 0)
      return res.status(404).json({ message: "No existe ese documento" });

    const likes = await increaseLikes(req.params.id);
    console.log(likes);
    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const crearDocumento = async (req, res, next) => {
  try {
    const { title, subtitle, body, status, user_id } = req.body;
    let image = null;
    let image_thumb = null;

    if (req.file) {
      const processedImage = await processDocumentImage(req.file);
      image = processedImage.image;
      image_thumb = processedImage.image_thumb;
    }

    const documento = await createDocument({
      title,
      subtitle,
      body,
      status,
      user_id,
      image,
      image_thumb,
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
    let image;
    let image_thumb;

    if (req.file) {
      const processedImage = await processDocumentImage(req.file);
      image = processedImage.image;
      image_thumb = processedImage.image_thumb;
    }

    const documento = await getDocumentById(id);

    if (documento.length === 0)
      return res.status(404).json({ message: `No existe doc. con id ${id}` });

    const documentoActualizado = await updateDocument(id, {
      title,
      subtitle,
      body,
      status,
      image,
      image_thumb,
    });
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
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// GESTIÓN DE LIKES - RED SOCIAL
export const obtenerLikesUsuario = async (req, res, next) => {
  try {
    const docs = await getUserLikedDocuments(req.user.id);

    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const likeContadorControl = async (req, res, next) => {
  try {
    const documentId = req.params.id;
    const userId = req.user.id;
    const result = await likeDocument(documentId, userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const unlikeControl = async (req, res, next) => {
  try {
    const documentId = req.params.id;
    const userId = req.user.id;
    const result = await unlikeDocument(documentId, userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
