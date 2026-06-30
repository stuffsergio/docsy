/* eslint-disable no-unused-vars */
import { useAuth } from "../context/AuthContext";
import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";

import Lista from "../components/Lista";
import CrearDocumento from "../components/CrearDocumento";
import ConfirmarEliminar from "../components/ConfirmarEliminar";
import { eliminarDocumento } from "../api/listasApi";
import { successToast } from "../utils/sileoToast";

export default function DocsUsuario() {
  const {
    isAuthenticated,
    usuario,
    documentos,
    cargarDocumentosUsuario,
    token,
  } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEliminar, setIsOpenEliminar] = useState(false);
  const [docEliminar, setDocEliminar] = useState(null);
  const [docEditar, setDocEditar] = useState(null);
  const [indexDoc, setIndexDoc] = useState(null);

  const lenis = useLenis();
  useEffect(() => {
    const modalAbierto = isOpen || isOpenEliminar;

    if (modalAbierto) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      lenis?.start();
    };
  }, [isOpen, isOpenEliminar, lenis]);

  if (isAuthenticated && !usuario) {
    return <p>Cargando perfil...</p>;
  }

  async function eliminarDoc(id) {
    try {
      const data = await eliminarDocumento(id, token);

      if (docEditar?.id === id) {
        setDocEditar(null);
      }

      successToast("Doc. eliminado", `Doc. ${id} eliminado correctamente`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div
      {...mainAnimation}
      className={`relative md:w-[80dvw] sm:w-[90dvw] w-[95dvw] m-auto`}
    >
      <h1 className="md:text-xl sm:text-lg text-base text-center pt-10">
        Página para crear, editar y documentos del usuario autenticado
      </h1>

      {/* BARRA AYUDA */}
      {documentos.length !== 0 && (
        <div className="md:w-[80dvw] sm:w-[90dvw] w-[95dvw] m-auto flex md:flex-row flex-col md:justify-between justify-start md:items-center items-baseline md:py-10 py-6 px-5 md:gap-0 gap-5">
          <div className="flex flex-row items-center gap-5">
            <label htmlFor="buscar">
              <p className="md:flex hidden">Buscar</p>
              <Search className="md:hidden flex w-4 h-auto" />
            </label>
            <input
              type="search"
              name="buscar"
              className="md:w-full px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
            />
          </div>
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="group flex flex-row items-center gap-2 py-1.5 px-4 border border-[#1f1f1f]/60 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
            >
              <p className="sm:text-base text-sm">Nuevo</p>
              <Plus className="w-5 h-auto bg-[#111111] text-white rounded-full p-1 group-hover:translate-x-1 transition-all transform duration-350" />
            </button>
          </div>
        </div>
      )}

      <div className="md:w-[80dvw] sm:w-[90dvw] w-[95dvw] m-auto pb-10">
        {/* DOCUMENTOS DEL USUARIO */}
        <div className="flex flex-col gap-1">
          {documentos.map((l, index) => (
            <Lista
              key={l.id}
              index={index}
              title={l.title}
              subtitle={l.subtitle}
              body={l.body}
              status={l.status}
              cargar={() => {
                setDocEditar(l);
                setIsOpen(true);
                setIndexDoc(index);
              }}
              setQuienEliminar={() => {
                setIsOpenEliminar(true);
                setDocEliminar(l);
                setIndexDoc(index);
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center py-20">
          {documentos.length === 0 && (
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className="group flex flex-row items-center gap-2 py-3 px-6 border border-[#1f1f1f]/60 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
              >
                <p>Crear mi primer documento</p>
                <Plus className="w-5 h-auto bg-[#111111] text-white rounded-full p-1 group-hover:translate-x-2 transition-all transform duration-350" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <CrearDocumento
          docEditar={docEditar}
          setDocEditar={setDocEditar}
          salir={() => {
            setIsOpen(false);
            setDocEditar(null);
          }}
          index={indexDoc}
          recargarLista={cargarDocumentosUsuario}
        />
      )}

      {isOpenEliminar && (
        <ConfirmarEliminar
          eliminar={() => {
            eliminarDoc(docEliminar.id);
            setIsOpenEliminar(false);
            cargarDocumentosUsuario();
          }}
          docEliminar={docEliminar}
          setIsOpen={setIsOpenEliminar}
          index={indexDoc}
        />
      )}
    </motion.div>
  );
}
