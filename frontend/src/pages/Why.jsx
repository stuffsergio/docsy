import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";

export default function Why() {
  return (
    <motion.div {...mainAnimation} className="relative">
      <h1 className="text-center py-8">Entiende cómo funciona Docsy</h1>
      <div className="w-[80dvw] m-auto flex flex-col justify-between items-center py-10 px-5">
        <h2>Entiende el mundo de hoy, sin ruido en el intento</h2>
        <div className="flex flex-col items-center justify-between gap-10">
          <h3>Los 3 Pilares Fundamentales</h3>
          <div className="grid grid-cols-3 gap-1">
            <div className="flex flex-col items-center gap-2 border border-[#1f1f1f]">
              <h4>Curaduría contra el caos</h4>
              <p>No necesitas leer más, necesitas leer mejor.</p>
            </div>
            <div className="flex flex-col items-center gap-2 border border-[#1f1f1f]">
              <h4>Rigor técnico y científico</h4>
              <p>
                Revisa las fuentes de cada documento, no te pierdas lo
                importante.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 border border-[#1f1f1f]">
              <h4>Formato optimizado para tu tiempo</h4>
              <p>En un mundo lleno de ruido, tómate un doc-ffe</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-10">
          <h3>Datos de impacto</h3>
        </div>
      </div>
    </motion.div>
  );
}
