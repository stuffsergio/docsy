import { useAuth } from "../context/AuthContext";
import { Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";

import Lista from "../components/Lista";
import CrearDocumento from "../components/CrearDocumento";
import ConfirmarEliminar from "../components/ConfirmarEliminar";
import { eliminarDocumento } from "../api/listasApi";
import { successToast } from "../utils/sileoToast";

export default function DocsUsuario() {
  const { isAuthenticated, usuario, documentos, cargarDocumentosUsuario } =
    useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEliminar, setIsOpenEliminar] = useState(false);
  const [docEliminar, setDocEliminar] = useState(null);
  const [docEditar, setDocEditar] = useState(null);
  const [indexDoc, setIndexDoc] = useState(null);

  if (isAuthenticated && !usuario) {
    return <p>Cargando perfil...</p>;
  }

  async function eliminarDoc(id) {
    console.log("Eliminando... id ", id);
    try {
      const data = await eliminarDocumento(id);
      console.log(data);

      if (docEditar?.id === id) {
        setDocEditar(null);
      }

      successToast("Doc. eliminado", `Doc. ${id} eliminado correctamente`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div {...mainAnimation} className="relative">
      <h1 className="text-center py-8">
        Página para crear, editar y documentos del usuario autenticado
      </h1>

      {/* BARRA AYUDA */}
      {documentos.length !== 0 && (
        <div className="w-[80dvw] m-auto flex flex-row justify-between items-center py-10 px-5">
          <div className="flex flex-row items-center gap-5">
            <label htmlFor="buscar">Buscar</label>
            <input
              type="search"
              name="buscar"
              className="flex-1 px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
            />
          </div>
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="group flex flex-row items-center gap-2 py-1.5 px-4 border border-[#1f1f1f]/60 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
            >
              <p>Nuevo</p>
              <Plus className="w-5 h-auto bg-[#111111] text-white rounded-full p-1 group-hover:translate-x-1 transition-all transform duration-350" />
            </button>
          </div>
        </div>
      )}

      <div className="w-[80dvw] m-auto mb-10">
        {/* DOCUMENTOS DEL USUARIO */}
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
