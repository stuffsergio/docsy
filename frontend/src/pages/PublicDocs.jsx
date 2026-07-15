/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import "../App.css";
import Lista from "../components/Lista";

import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getDocsPublic, aumentarLikes, retirarLike } from "../api/listasApi";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";
import { useAuth } from "../context/AuthContext";

export default function PublicDocs() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [search, setSearch] = useState(q);

  async function obtenerLista() {
    try {
      setLoading(true);

      const data = await getDocsPublic(token);

      setDocs(data);
    } catch (err) {
      console.log(err);
      console.log("error aqui", token);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obtenerLista();
  }, []);

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

      setDocs((prev) =>
        prev.map((doc) =>
          doc.id === id
            ? {
                ...doc,
                likes: liked ? doc.likes - 1 : doc.likes + 1,
                user_liked: liked ? 0 : 1,
              }
            : doc,
        ),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLikeLoading(false);
    }
  }

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
          <h4>AÑADIR FILTROS</h4>
          <div>
            <p>Categoría, tags, typo, most viewed, recents...</p>
          </div>
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
          <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
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
                image_thumb={l.image_thumb}
                darLike={handleLike}
                usuario={{
                  id: l.user_id,
                  name: l.name,
                  email: l.email,
                  role: l.role,
                  avatar_img: l.avatar_img,
                }}
                loading={loading}
                usersLike={l.user_liked === 1}
              />
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
