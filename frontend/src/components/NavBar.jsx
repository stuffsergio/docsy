import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Profile from "./Profile";

export default function NavBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
        setIsOpen(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed top-5 xl:w-[70dvw] md:w-[60dvw] sm:w-[70dvw] w-[92dvw] left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-lg shadow-md transition-all transform duration-400`}
    >
      <div className="flex items-center justify-between md:px-8 px-5 py-4 h-16">
        <ul className="pointer-events-none text-xl">docsy</ul>
        <ul className="flex flex-row items-center xl:gap-16 lg:gap-10 md:gap-8 sm:gap-6 gap-2 md:text-sm text-xs">
          <ul className="flex flex-row items-center md:gap-6 gap-3">
            {isAuthenticated ? (
              <Link
                to="/publicDocs"
                className={`group flex flex-row items-center gap-1 hover:opacity-100 ${location.pathname === "/publicDocs" ? "opacity-100" : "opacity-65"} transition-all transform duration-200`}
              >
                <span className="group-hover:-translate-x-1 transition-all transform duration-200">
                  {"{"}
                </span>
                public
                <span className="group-hover:translate-x-1 transition-all transform duration-200">
                  {"}"}
                </span>
              </Link>
            ) : (
              <Link
                to="/"
                className={`group flex flex-row items-center gap-1 hover:opacity-100 ${location.pathname === "/" ? "opacity-100" : "opacity-65"} transition-all transform duration-200`}
              >
                <span className="group-hover:-translate-x-1 transition-all transform duration-200">
                  {"{"}
                </span>
                inicio
                <span className="group-hover:translate-x-1 transition-all transform duration-200">
                  {"}"}
                </span>
              </Link>
            )}
            {isAuthenticated ? (
              <Link
                to="/docs"
                className={`group flex flex-row items-center gap-1 hover:opacity-100 ${location.pathname === "/docs" ? "opacity-100" : "opacity-65"} transition-all transform duration-200`}
              >
                <span className="group-hover:-translate-x-1 transition-all transform duration-200">
                  {"{"}
                </span>
                my docs
                <span className="group-hover:translate-x-1 transition-all transform duration-200">
                  {"}"}
                </span>
              </Link>
            ) : (
              <Link
                to="/publicDocs"
                className={`group flex flex-row items-center gap-1 hover:opacity-100 ${location.pathname === "/publicDocs" ? "opacity-100" : "opacity-65"} transition-all transform duration-200`}
              >
                <span className="group-hover:-translate-x-1 transition-all transform duration-200">
                  {"{"}
                </span>
                public
                <span className="group-hover:translate-x-1 transition-all transform duration-200">
                  {"}"}
                </span>
              </Link>
            )}
            <Link
              to="/why"
              className={`group flex flex-row items-center gap-1 hover:opacity-100 ${location.pathname === "/why" ? "opacity-100" : "opacity-65"} transition-all transform duration-200`}
            >
              <span className="group-hover:-translate-x-1 transition-all transform duration-200">
                {"{"}
              </span>
              why
              <span className="group-hover:translate-x-1 transition-all transform duration-200">
                {"}"}
              </span>
            </Link>
          </ul>
          <ul>
            {isAuthenticated ? (
              <div className="pt-1.5">
                <Profile
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  location={location.pathname}
                />
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-black rounded-full hover:opacity-90 transition-all transform duration-250"
              >
                Entrar
              </Link>
            )}
          </ul>
        </ul>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-transparent absolute inset-0 z-20"
        />
      )}
    </motion.nav>
  );
}
