/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getDocPublicById, aumentarLikes, retirarLike } from "../api/listasApi";

import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerGravatarAleatorio, formatearFecha } from "../utils/functions";
import { useAuth } from "../context/AuthContext";
import { ThumbsUp } from "lucide-react";

export default function PublicDocsDetalle() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);

  async function obtenerDocumento() {
    try {
      setLoading(true);

      const documento = await getDocPublicById(id, token);
      setData(documento);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(id, liked) {
    if (likeLoading) return;

    try {
      setLikeLoading(true);
      if (!token) {
        navigate("/login");
        return;
      }

      if (liked) {
        await retirarLike(id, token);
      } else {
        await aumentarLikes(id, token);
      }

      setData((prev) => ({
        ...prev,
        likes: liked ? prev.likes - 1 : prev.likes + 1,
        user_liked: liked ? 0 : 1,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLikeLoading(false);
    }
  }

  useEffect(() => {
    obtenerDocumento();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <motion.div {...mainAnimation} className="relative">
      <h1 className="text-center py-8">
        Aquí tienes los detalles del documento
      </h1>

      <div className="lg:w-[45dvw] md:w-[70dvw] m-auto mb-10 flex flex-col gap-6">
        {/* HEADER */}
        <div className="relative h-52 overflow-hidden group">
          {(data.image || data.image_thumb) && (
            <>
              <motion.img
                src={`${data.image_thumb || data.image}`}
                alt={`${data.image_thumb}`}
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
                className="w-full h-full object-cover transition-transform duration-500"
              />

              {/* Degradado rectangular desde los 4 lados */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(to top, #111111 0%, transparent 10%),
                    linear-gradient(to bottom, #111111 0%, transparent 5%),
                    linear-gradient(to left, #111111 0%, transparent 5%),
                    linear-gradient(to right, #111111 0%, transparent 5%)
                  `,
                }}
              />

              {/* pequeño brillo al hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/2 transition-all duration-1000" />
            </>
          )}
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-4xl leading-12">{data.title}</h2>
            <p className="text-xl opacity-90">{data.subtitle}</p>
          </div>

          <div className="flex flex-row items-center gap-4">
            <img
              src={data.avatar_img || obtenerGravatarAleatorio()}
              alt="img avatar usuario"
              className="w-8 h-auto rounded-full border border-white"
            />
            <div className="w-full flex flex-row items-center justify-between gap-3 md:pr-10 opacity-80">
              <div className="flex flex-row items-center gap-3">
                <p className="text-lg pb-0.5">Creado por {data.name}</p>
                {data.role === "admin" && (
                  <img
                    src="/Verified.svg"
                    alt="verified icon"
                    className="w-4"
                  />
                )}
              </div>
              <div>
                <p className="text-sm">{formatearFecha(data.last_modified)}</p>
              </div>
              {/* LIKES */}
              <div className="flex flex-row justify-end items-center gap-2 opacity-70">
                {data.likes !== 0 && (
                  <span className={`text-xs`}>{data.likes}</span>
                )}
                <motion.button
                  onClick={() => handleLike(id, data.user_liked)}
                  whileHover={{ y: -3, x: -1, rotate: -10 }}
                  whileTap={{ y: 1, x: 1, rotate: 5 }}
                >
                  <ThumbsUp
                    className={`w-3.5 h-auto ${data.user_liked ? "text-blue-500 fill-blue-300" : "text-white"}`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        {/* BODY */}
        <div className="flex flex-col">
          <p className="text-lg tracking-wide leading-8">{data.body}</p>
        </div>
        <div>
          <h3>Enlaces - bibliografía</h3>
          <p className="text-xs">
            Aquí irán los enlaces para bibliografía, servirán para asegurarse de
            que el documento tiene fundamentos, irán rankeados según la
            fiabilidad de las fuentes, por ahora está basado en cantidad de
            documentos adjuntados al usuario (en un futuro un llm controlará
            esto)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
