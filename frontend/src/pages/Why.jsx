import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";

export default function Why() {
  return (
    <motion.div {...mainAnimation} className="relative">
      <h1 className="text-center py-8">Entiende cómo funciona Docsy</h1>
      <div className="w-[80dvw] m-auto flex flex-col justify-between items-center py-10 px-5">
        <h2>Entiende el mundo de hoy, sin ruido en el intento</h2>
        <div className="flex flex-col items-center justify-between gap-10">
          <h3>
            Los 3 Pilares Fundamentales{" "}
            <span>
              <Pilar />
            </span>
          </h3>
          <div className="grid grid-cols-3 gap-1">
            <div className="flex flex-col center gap-6 p-5 border border-[#1f1f1f]">
              <h4 className="text-xl text-center">Curaduría contra el caos</h4>
              <p className="text-sm">
                No necesitas leer más, necesitas leer mejor.
              </p>
            </div>
            <div className="flex flex-col  gap-6 p-5 border border-[#1f1f1f]">
              <h4 className="text-xl text-center">
                Rigor técnico y científico
              </h4>
              <p className="text-sm">
                Revisa las fuentes de cada documento, no te pierdas lo
                importante.
              </p>
            </div>
            <div className="flex flex-col  gap-6 p-5 border border-[#1f1f1f]">
              <h4 className="text-xl text-center">
                Formato optimizado para tu ritmo
              </h4>
              <p className="text-sm">
                En un mundo lleno de ruido, tómate un doc-ffe
              </p>
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

function Pilar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M57 39v16h110V39zm32 34v318h46V73zm334 21.56l-46 23.04V391h46zM254.2 187L233 197.6V391h46V211.7zM73 409v30h78v-30zm144 0v30h78v-30zm144 0v30h78v-30zM38.49 457l-10 30H483.5l-10-30z"
      />
    </svg>
  );
}
