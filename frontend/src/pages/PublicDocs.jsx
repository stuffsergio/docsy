/* eslint-disable react-hooks/set-state-in-effect */
import "../App.css";
import Lista from "../components/Lista";

import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getDocsPublic } from "../api/listasApi";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";

export default function PublicDocs() {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [search, setSearch] = useState(q);

  async function obtenerLista() {
    try {
      setLoading(true);

      const data = await getDocsPublic();

      setDocs(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obtenerLista();
  }, []);

  useEffect(() => {
    // Debounce para actualizar la URL
    const timer = setTimeout(() => {
      if (search.trim() === "") {
        setSearchParams({});
      } else {
        setSearchParams({ q: search });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, setSearchParams]);

  const lista = useMemo(() => {
    return docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q.toLowerCase()) ||
        d.subtitle.toLowerCase().includes(q.toLowerCase()) ||
        d.body.toLowerCase().includes(q.toLowerCase()),
    );
  }, [docs, q]);

  return (
    <motion.div {...mainAnimation} className="relative">
      <h1 className="text-center py-8">
        Hecha un vistazo a lo que otros usuarios han publicado estos días
      </h1>
      {/* BARRA AYUDA */}
      <div className="w-[80dvw] m-auto flex flex-row justify-between items-center py-10 px-5">
        <div className="flex flex-row items-center gap-5">
          <label htmlFor="buscar">Buscar</label>
          <input
            type="search"
            name="buscar"
            autoComplete="off"
            autoCorrect="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
          />
        </div>
        <div>
          <Link
            to="/docs"
            className="group flex flex-row items-center gap-2 py-1.5 px-4 border border-[#1f1f1f]/60 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
          >
            <p>Publicar</p>
            <Plus className="w-5 h-auto bg-[#111111] text-white rounded-full p-1 group-hover:translate-x-1 transition-all transform duration-350" />
          </Link>
        </div>
      </div>

      {lista.length === 0 ? (
        <div className="w-[80dvw] m-auto mb-10">
          <p className="text-center py-10">No se han encontrado documentos</p>
        </div>
      ) : (
        <div className="w-[80dvw] m-auto mb-10">
          <ul className="grid lg:grid-cols-3 grid-cols-2 gap-3">
            {lista.map((l, index) => (
              <Lista
                key={l.id}
                index={index}
                id={l.id}
                title={l.title}
                subtitle={l.subtitle}
                body={l.body}
                likes={l.likes}
                image={l.image}
                usuario={{
                  id: l.user_id,
                  name: l.name,
                  email: l.email,
                  role: l.role,
                  avatar_img: l.avatar_img,
                }}
                loading={loading}
              />
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
