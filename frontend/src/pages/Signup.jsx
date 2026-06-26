import { useState, useRef } from "react";
import { signup } from "../api/usersApi";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";
import Underline from "../components/ui/Underline";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const initialForm = {
    name: "",
    email: "",
    password: "",
    role: "user",
  };
  const [form, setForm] = useState(initialForm);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const nombreInputRef = useRef();
  const emailInputRef = useRef();
  const contraseñaInputRef = useRef();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setMostrarContraseña(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      nombreInputRef.current?.focus();
      setError("Debes rellenar el nombre");
      return;
    }
    if (!form.email) {
      emailInputRef.current?.focus();
      setError("Debes rellenar el email");
      return;
    }
    if (!form.password) {
      contraseñaInputRef.current?.focus();
      setError("Debes rellenar la contraseña");
      return;
    }

    try {
      const res = await signup(form);
      console.log(res);
      login(res.token); // Método dentro de AuthContext que guarda token en localStorage

      resetForm();
      navigate("/docs");
    } catch (err) {
      console.log(err);
      setError(err.message || "Error, inténtelo de nuevo");
    }
  };
  return (
    <motion.div
      {...mainAnimation}
      className="h-[74dvh] flex-1 flex flex-col gap-8 items-center pt-15"
    >
      <h1 className="text-3xl">Regístrate en Docsy</h1>

      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col gap-6 mt-0 px-5 py-10"
      >
        <div className="w-full flex flex-col justify-center items-start gap-2 text-lg">
          <label htmlFor="name" className="flex-1">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Jhon Ternus"
            ref={nombreInputRef}
            value={form.name}
            onChange={handleChange}
            className="w-full flex-1 px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2 text-lg">
          <label htmlFor="email" className="flex-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="jhon-ternus@gmail.com"
            ref={emailInputRef}
            value={form.email}
            onChange={handleChange}
            className="w-full flex-1 px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2 text-lg">
          <label htmlFor="contraseña" className="px-0">
            Contraseña
          </label>
          <div className="relative w-full">
            <input
              type={mostrarContraseña ? "text" : "password"}
              name="password"
              id="password"
              ref={contraseñaInputRef}
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
            />
            <button
              type="button"
              onClick={() => setMostrarContraseña(!mostrarContraseña)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
            >
              {mostrarContraseña ? (
                <Eye className="w-4 h-auto opacity-50" />
              ) : (
                <EyeClosed className="w-4 h-auto opacity-40" />
              )}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full py-2 mt-4 bg-white text-black">
          Empezar
        </button>
        <div className="h-px w-full bg-white/30" />
        <Link
          to="/login"
          className="flex flex-row gap-2 justify-center items-center opacity-70"
        >
          <p>¿Tienes una cuenta?</p>
          <Underline>Click</Underline>
        </Link>{" "}
        {error && (
          <div className="w-full px-10 py-2 bg-[#ffdbdb] text-[#cb2a2f]">
            <p>{error}</p>
          </div>
        )}
      </form>
    </motion.div>
  );
}
