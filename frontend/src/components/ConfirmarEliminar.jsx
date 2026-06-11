import { fadeAnimation, whileAnimationSuave } from "../utils/animation";
import { motion } from "framer-motion";

export default function ConfirmarEliminar({
  setIsOpen,
  eliminar,
  docEliminar,
  index,
}) {
  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-white/10 backdrop-blur-xs"
      />
      <motion.div
        {...fadeAnimation}
        className="absolute z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-4 p-10 bg-black"
      >
        <div className="flex flex-col justify-center items-center gap-8">
          {/* TARJETA DOC */}
          <div className="flex flex-row gap-4 px-4 py-2 border border-[#1f1f1f]">
            <div className="flex flex-col gap-1">
              <h4 className="text-base line-clamp-1">{docEliminar.title}</h4>
              <p className="text-sm opacity-80 line-clamp-1">
                {docEliminar.subtitle}
              </p>
            </div>
            <div className="geist-mono">{index + 1}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center">
              ¿Estás seguro de eliminar este documento?
            </p>
            <motion.button
              onClick={eliminar}
              {...whileAnimationSuave}
              className="border-red-800 text-red-950 bg-red-300 px-3 py-1.5 rounded-full"
            >
              Eliminar
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
