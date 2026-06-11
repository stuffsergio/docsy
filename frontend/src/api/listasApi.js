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

export const crearDocumento = async ({
  title,
  subtitle,
  body,
  status,
  user_id,
}) => {
  console.log(user_id);
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lista`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, subtitle, body, status, user_id }),
  });
  const data = await res.json();
  return data;
};

export const actualizarDocumento = async ({
  id,
  title,
  subtitle,
  body,
  status,
}) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, body, status }),
      },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error:");
    console.log(err);
  }
};

export const eliminarDocumento = async (id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista/${id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error");
    console.log(err);
  }
};
