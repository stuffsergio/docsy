import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Circle from "./Circle";
import { Ellipsis, Pencil, Trash, ArrowRight, ThumbsUp } from "lucide-react";
import { fadeAnimation2, whileAnimation } from "../utils/animation";
import { obtenerGravatarAleatorio } from "../utils/functions";

export default function Lista({
  title,
  id,
  subtitle,
  body,
  status,
  likes,
  image,
  image_thumb,

  loading,
  cargar,
  setQuienEliminar,
  darLike,

  usuario,
}) {
  const [showMenu, setShowMenu] = useState(false);

  if (loading)
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );

  return (
    <div className="p-px bg-linear-to-b from-0% from-white/30 via-40% via-white/10 to-[#1f1f1f]">
      <li className="flex flex-col justify-between gap-4 bg-[#111111]">
        {/* HEADER */}
        {location.pathname === "/publicDocs" && (
          <div
            className="
      relative
      h-52
      overflow-hidden
      group
    "
          >
            {(image || image_thumb) && (
              <>
                <motion.img
                  src={`${import.meta.env.VITE_BACKEND_URL}${image_thumb || image}`}
                  alt={`${import.meta.env.VITE_BACKEND_URL}${image_thumb}`}
                  onError={(e) => {
                    console.log("ERROR IMAGEN");
                    console.log(e.currentTarget.src);
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="
            w-full
            h-full
            object-cover

            transition-transform

            duration-500
          "
                />

                {/* Gradient inferior estilo Linear */}
                <div
                  className="
            absolute
            inset-0

            bg-linear-to-b

            from-transparent

            via-transparent

            to-[#111111]

          "
                />

                {/* pequeño brillo al hover */}
                <div
                  className="
            absolute
            inset-0

            bg-white/0

            group-hover:bg-white/5

            transition-all

            duration-500
          "
                />
              </>
            )}
          </div>
        )}
        <div className="flex flex-col gap-0.5 p-5">
          <div className="flex flex-col">
            {/* TITLE */}
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-xl font-bold">{title}</h3>
            </div>

            {/* SUBTITLE */}
            {location.pathname === "/docs" && (
              <div className="mt-2 min-h-[3em] pr-2.5">
                <p className="text-base line-clamp-2">{subtitle}</p>
              </div>
            )}

            {/* BODY */}
            <div className="mt-4">
              <p className="text-sm opacity-85 pr-2.5 md:line-clamp-3">
                {body}
              </p>
            </div>
          </div>
          {/* EN PUBLIC DOCS - datos usuario de x documento */}
          {location.pathname === "/publicDocs" && (
            <div className="flex flex-row items-center justify-between pt-5 pr-4">
              <div className="flex flex-row items-center gap-3">
                <div>
                  <img
                    src={usuario?.avatar_img || obtenerGravatarAleatorio()}
                    alt="img avatar usuario"
                    className="w-6 h-auto rounded-full border border-white/30"
                  />
                </div>
                <div className="flex flex-row items-center gap-1.5">
                  <p className="text-xs opacity-70">
                    Creado por {usuario?.name}
                  </p>
                  {usuario?.role === "admin" && (
                    <img src="/Verified.svg" alt="verified icon" />
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="group flex flex-row items-center gap-1 opacity-70">
                  <Link
                    to={`/publicDocs/${id}`}
                    className="text-sm translate-x-2 group-hover:-translate-x-1 transition-all transform duration-200"
                  >
                    Ver más
                  </Link>
                  <ArrowRight className="w-3.5 h-auto opacity-0 group-hover:opacity-100 transition-all transform duration-300" />
                </div>
                <div className="flex flex-row items-center gap-2 opacity-70">
                  {likes !== 0 && <span className="text-xs">{likes}</span>}
                  <motion.button
                    onClick={() => darLike(id)}
                    whileHover={{ y: -3, x: -1, rotate: -10 }}
                    whileTap={{ y: 1, x: 1, rotate: 5 }}
                  >
                    <ThumbsUp className="w-3.5 h-auto" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          {/* FOOTER */}
          {location.pathname === "/docs" && (
            <div className="flex flex-row justify-between items-center pt-4 pr-4">
              <span
                className={`text-xs geist-mono tracking-tight ${status === "pendiente" ? "text-amber-200" : status === "publicado" ? "text-blue-300" : "text-slate-200"}`}
              >
                {status}
              </span>

              <div
                className="relative flex flex-col justify-center items-center"
                onMouseLeave={() => setShowMenu(false)}
              >
                <span
                  className="relative"
                  onMouseEnter={() => setShowMenu(true)}
                >
                  <Ellipsis className="w-6 h-auto" />
                  {showMenu && (
                    <button className="w-10 h-10 absolute -right-2 top-1/2 -translate-y-1/2 flex flex-items-center justify-center pointer-events-none">
                      <Circle />
                    </button>
                  )}
                </span>

                {showMenu && (
                  <motion.div
                    {...fadeAnimation2}
                    className="absolute bottom-1/2 right-0 translate-y-1/2 flex flex-row justify-center items-center gap-5.5 py-4 pl-4 pr-16"
                  >
                    <motion.button onClick={cargar} {...whileAnimation}>
                      <Pencil className="w-5 h-auto text-[#FFF200]" />
                    </motion.button>
                    <motion.button
                      onClick={setQuienEliminar}
                      {...whileAnimation}
                    >
                      <Trash className="w-5 h-auto text-[#FF2D55]" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </li>
    </div>
  );
}
