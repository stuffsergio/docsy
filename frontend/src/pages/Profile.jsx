import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";
import { LogOut, Plus } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, usuario, documentos, logout } = useAuth();

  if (isAuthenticated && !usuario) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <motion.div {...mainAnimation}>
      {isAuthenticated && usuario ? (
        <div className="lg:w-[38dvw] md:w-[48dvw] w-[50dvw] m-auto mb-10">
          <h1 className="text-center py-8">PERFIL & CONFIGURACIÓN</h1>

          <div className="py-5">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-3xl font-bold">Hola {usuario?.name}</h2>
              <button
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={logout}
                className="relative flex flex-row items-center justify-center gap-2 px-2 py-1 text-sm text-red-200 hover:cursor-pointer"
              >
                <p
                  className={`absolute left-0 whitespace-nowrap ${isVisible ? "-translate-x-full opacity-100" : "translate-x-0 opacity-0"} transition-all transform duration-200`}
                >
                  Cerrar sesión
                </p>
                <LogOut className="w-3 h-auto" />
              </button>
            </div>

            {/* DATOS PERSONALES */}
            <div className="flex flex-col gap-2 py-2 px-4">
              <p className="text-lg">{usuario?.email}</p>
              <p className="text-base opacity-80">
                {usuario?.total_documentos}{" "}
                {usuario?.total_documentos === 1
                  ? "documento guardado"
                  : "documentos guardados"}
              </p>
            </div>

            {/* DOCUMENTOS DEL USUARIO */}
            <div className="flex flex-col gap-4">
              {documentos.length !== 0 && (
                <div className="flex flex-row justify-end">
                  <Link
                    to="/docs"
                    className="group flex flex-row items-center justify-end gap-2 py-1.5 px-4 border border-[#1f1f1f]/60 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
                  >
                    <p>Crear</p>
                    <Plus className="w-5 h-auto bg-[#111111] text-white rounded-full p-1 group-hover:translate-x-1 transition-all transform duration-350" />
                  </Link>
                </div>
              )}
              <ul className="flex flex-col gap-4">
                {documentos.map((d, index) => (
                  <li
                    key={d.id}
                    className="flex flex-col gap-4 p-5 border border-[#1f1f1f]"
                  >
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-xl font-bold">{d.title}</h4>
                        <p className="text-lg opacity-90">{d.subtitle}</p>
                      </div>
                      <div>
                        <p className="text-sm">{index}</p>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2 opacity-80">{d.body}</p>

                    <span
                      className={`w-fit text-xs geist-mono border px-2 py-1 rounded-full
                        ${
                          d.status === "pendiente"
                            ? "border-amber-400 bg-amber-100 text-amber-700"
                            : d.status === "publicado"
                              ? "border-blue-500 bg-blue-200 text-blue-900"
                              : "border-slate-500 bg-slate-200 text-slate-900"
                        }
                      `}
                    >
                      {d.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center py-20">
              {documentos.length === 0 && (
                <div>
                  <Link
                    to="/docs"
                    className="group flex flex-row items-center gap-2 py-3 px-6 border border-[#1f1f1f]/60 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
                  >
                    <p>Crear mi primer documento</p>
                    <Plus className="w-5 h-auto bg-[#111111] text-white rounded-full p-1 group-hover:translate-x-2 transition-all transform duration-350" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Usuario no autenticado</p>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      )}
    </motion.div>
  );
}
