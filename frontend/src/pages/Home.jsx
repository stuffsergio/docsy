import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { floatAnimation, mainAnimation } from "../utils/animation";

export default function Home() {
  return (
    <motion.div {...mainAnimation} className="relative">
      <div className="h-[74dvh] py-10 px-20 flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-row items-end">
            <h1 className="font-bold text-6xl">
              Registra tus documentos favoritos
            </h1>
          </div>
          <h3 className="text-2xl opacity-70">
            Gestiona la actualidad y participa en ella
          </h3>
        </div>
        <div>
          <Link
            to="/login"
            className="group flex flex-row items-center gap-2 py-3 px-6 border border-[#1f1f1f]/60 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
          >
            <p>Crear mi primer documento</p>
            <ArrowRight className="w-5 h-auto bg-[#111111] text-white rounded-full p-1 group-hover:translate-x-2 transition-all transform duration-350" />
          </Link>
        </div>
      </div>

      {/* IMAGES FLOTANTES */}
      <motion.div
        {...floatAnimation}
        className="absolute top-1/2 -translate-y-70 lg:left-100 md:left-20 sm:left-10 -z-10"
      >
        <img
          src="/document.webp"
          alt="document"
          className="lg:w-40 w-30 h-auto animate"
        />
      </motion.div>
      <motion.div
        {...floatAnimation}
        transition={{ delay: 0.8 }}
        className="absolute top-1/2 translate-y-1/4 lg:right-100 md:right-20 sm:right-10"
      >
        <img
          src="/pencil.webp"
          alt="document"
          className="md:w-40 w-30 h-auto animate"
        />
      </motion.div>
      <motion.div
        {...floatAnimation}
        transition={{ delay: 0.5 }}
        className="absolute top-1/4 translate-y-60 lg:left-100 md:left-20 sm:left-10"
      >
        <AI />
      </motion.div>
    </motion.div>
  );
}

export const AI = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0,0,256,256"
  >
    <g fill="#ffffff" stroke="none">
      <g transform="scale(8.53333,8.53333)">
        <path d="M15.142,1.451v0c0.693,7.098 6.31,12.714 13.408,13.408v0c0.171,0.017 0.171,0.267 0,0.283v0c-7.098,0.693 -12.714,6.31 -13.408,13.408v0c-0.017,0.171 -0.267,0.171 -0.283,0v0c-0.693,-7.098 -6.31,-12.714 -13.408,-13.408v0c-0.171,-0.017 -0.171,-0.267 0,-0.283v0c7.098,-0.693 12.714,-6.31 13.408,-13.408v0c0.016,-0.172 0.266,-0.172 0.283,0z"></path>
      </g>
    </g>
  </svg>
);
