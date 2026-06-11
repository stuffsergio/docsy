export const listarUsuarios = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`);

  const data = await response.json();

  return data;
};

export const loginApi = async ({ email, password }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || data.message || "Error en el login");

  return data;
};

export const signup = async ({ name, email, password, role }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    },
  );

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error || data.message || "Error en el registro");

  return data;
};

export const profile = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
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
        data.error || data.message || "Error al obtener el perfil del usuario",
      );

    return data;
  } catch (err) {
    console.log(err);
  }
};
