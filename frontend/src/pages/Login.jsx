import { useState, useRef } from "react";
import { loginApi } from "../api/usersApi";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../components/ui/Underline";
import { motion } from "framer-motion";
import { mainAnimation } from "../utils/animation";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialForm = {
    email: "",
    password: "",
  };
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const emailInputRef = useRef();
  const contraseñaInputRef = useRef();

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

    if (!form.email) {
      setError("Debes rellenar el email");
      emailInputRef.current?.focus();
      return;
    }
    if (!form.password) {
      setError("Debes rellenar la contraseña");
      contraseñaInputRef.current?.focus();
      return;
    }

    // console.log(form);

    try {
      const res = await loginApi(form);
      login(res.token); // Método en AuthContext que guarda token en localStorage

      resetForm();
      navigate("/docs");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <motion.div
      {...mainAnimation}
      className="h-[74dvh] flex-1 flex flex-col gap-8 items-center pt-15"
    >
      <h1 className="text-3xl">Inicia sesión en Docsy</h1>
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col gap-6 mt-0 px-5 py-10"
      >
        <div className="w-full flex flex-col justify-center items-start gap-2 text-lg">
          <label htmlFor="email" className="">
            Tu email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="jhon-ternus@gmail.com"
            ref={emailInputRef}
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
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
          Entrar
        </button>
        <div className="h-px w-full bg-white/30" />
        <div className="flex flex-row gap-2 justify-center items-center opacity-70">
          <p>¿No tienes cuenta? </p>
          <Underline>
            <Link to="/signup">Click</Link>
          </Underline>
        </div>
        {error && (
          <div className="w-full px-10 py-2 bg-[#ffdbdb] text-[#cb2a2f]">
            <p>{error}</p>
          </div>
        )}
      </form>
    </motion.div>
  );
}
