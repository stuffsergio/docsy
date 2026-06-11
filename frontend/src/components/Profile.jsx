/* eslint-disable react-hooks/set-state-in-effect */
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeAnimation } from "../utils/animation";
import { Settings } from "lucide-react";
import md5 from "md5";

export default function Profile({ isOpen, setIsOpen, location }) {
  const { usuario, logout, documentos } = useAuth();
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    if (!usuario) return;

    const hash = md5(usuario.email);

    setImg(`https://www.gravatar.com/avatar/${hash}`);
  }, [usuario]);

  const handleVerPerfilPage = () => {
    setIsOpen(false);
    navigate("/perfil");
  };

  return (
    <div className="">
      <button onClick={() => setIsOpen(true)}>
        {img && (
          <img
            src={img}
            alt="user avatar url"
            className={`border w-10 h-auto rounded-full ${location === "/perfil" ? "border-white/70" : "border-transparent"} transition-all transform duration-150`}
          />
        )}
      </button>
      {/* OVERLAY */}
      {isOpen && (
        <div className="relative">
          <motion.div
            {...fadeAnimation}
            className="absolute -top-15 left-20 flex flex-col gap-2 z-30 bg-white/10 border border-white/10"
          >
            <div className="flex flex-col gap-3 p-3">
              <div className="flex flex-col gap-0.5">
                <p className="text-base">{usuario?.name}</p>
                <p className="text-sm opacity-70">{usuario?.email}</p>
                <p className="text-sm">Total docs. - {documentos.length}</p>
              </div>
              <div className="w-full">
                <button
                  onClick={handleVerPerfilPage}
                  className="group w-full flex flex-row items-center justify-between hover:cursor-pointer"
                >
                  <span className="group-hover:opacity-85 transition-all transform duration-150">
                    Ver perfil
                  </span>
                  <Settings className="w-6 p-1 group-hover:animate-spin" />
                </button>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="">
                <button
                  onClick={handleLogout}
                  className="text-red-200 hover:text-red-400 hover:cursor-pointer transition-all transform duration-150"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
