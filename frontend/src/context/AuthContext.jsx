/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useEffect, useState } from "react";
import { profile } from "../api/usersApi";
import { listarDocumentosPorUsuarioId } from "../api/listasApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [documentos, setDocumentos] = useState([]);

  const login = (tokenNuevo) => {
    localStorage.setItem("token", tokenNuevo);
    setToken(tokenNuevo);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    setToken(null);
    setDocumentos([]);
  };

  async function cargarDocumentosUsuario() {
    try {
      const data = await listarDocumentosPorUsuarioId(token);
      setDocumentos(data);
    } catch (err) {
      console.log(err);
      setDocumentos([]);
    }
  }

  // 1er useEffect() - CARGA INICIAL DEL TOKEN
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");

    if (tokenGuardado) {
      setToken(tokenGuardado);
    } else {
      // Si no hay token => usuario != autenticado => terminamos loading
      setLoading(false);
    }
  }, []);

  // 2do useEffect() - OBTENER PERFIL
  useEffect(() => {
    if (!token) return;

    // DATOS USUARIO - PROFILE
    async function getProfile() {
      try {
        const perfil = await profile(token);

        if (perfil.usuario) {
          setUsuario(perfil.usuario);
        }
      } catch (err) {
        console.log(err);
        logout(); // Si el token es inválido -> cerramos la sesión
      } finally {
        setLoading(false);
      }
    }

    getProfile();
    cargarDocumentosUsuario();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        loading,

        isAuthenticated: !!token,

        documentos,
        cargarDocumentosUsuario,

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
