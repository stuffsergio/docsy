/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getDocPublicById } from "../api/listasApi";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";
import { useParams } from "react-router-dom";
import { obtenerGravatarAleatorio, formatearFecha } from "../utils/functions";

export default function PublicDocsDetalle() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function obtenerDocumento() {
    try {
      setLoading(true);

      const documento = await getDocPublicById(id);
      // console.log(documento);
      setData(documento);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

      <div className="lg:w-[45dvw] md:w-[70dvw] m-auto mb-10">
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
                <p className="text-sm">{formatearFecha(data.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-8">
          <p className="text-lg tracking-wide leading-8">{data.body}</p>
        </div>
      </div>
    </motion.div>
  );
}
