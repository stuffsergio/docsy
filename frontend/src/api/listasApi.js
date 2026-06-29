export const getLista = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lista`);
  const data = await res.json();
  return data;
};

export const getDocId = async ({ id }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/lista/${id}`,
  );
  const data = await res.json();
  return data;
};

export const getDocsPublic = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/lista/publicDocs`,
  );
  const data = await res.json();
  return data;
};

export const getDocPublicById = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/lista/publicDocs/${id}`,
  );
  const data = await res.json();
  return data;
};

export const listarDocumentosPorUsuarioId = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista/docs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok)
      throw new Error(
        data.error || data.message || "No hay docs. para este usuario",
      );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const crearDocumento = async (formData, token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lista`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const actualizarDocumento = async ({ id, data }, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      },
    );
    const response = await res.json();
    return response;
  } catch (err) {
    console.log("Error:");
    console.log(err);
  }
};

export const eliminarDocumento = async (id, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error");
    console.log(err);
  }
};

// GESTIÓN LIKES
export const aumentarLikes = async (id, token) => {
  try {
    console.log("ID que llega: " + id);
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista/likes/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const retirarLike = async (id, token) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista/${id}/like`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
