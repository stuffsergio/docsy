/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { crearDocumento, actualizarDocumento } from "../api/listasApi";
import { fadeAnimation, fadeAnimation2 } from "../utils/animation";
import { successToast, errorToast } from "../utils/sileoToast";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function CrearDocumento({
  recargarLista,
  docEditar,
  setDocEditar,

  salir,
  index,
}) {
  const { usuario, documentos, token } = useAuth();
  const initialForm = {
    title: "",
    subtitle: "",
    body: "",
    status: "pendiente",
    user_id: usuario.id,
    image: null,
  };

  const [form, setForm] = useState(initialForm);
  const editando = Boolean(docEditar);
  const [errorData, setErrorData] = useState("");
  const [error, setError] = useState("");
  const inputTitleRef = useRef(null);
  const inputSubtitleRef = useRef(null);
  const inputBodyRef = useRef(null);

  const handleResetForm = () => {
    setDocEditar(null);
    setErrorData("");

    setForm(initialForm);
  };

  useEffect(() => {
    if (docEditar) {
      setForm({
        title: docEditar.title,
        subtitle: docEditar.subtitle,
        body: docEditar.body,
        status: docEditar.status,
        image: null,
      });
      setErrorData("");
    } else {
      handleResetForm();
    }
  }, [docEditar]);

  const validateForm = () => {
    if (!form.title) {
      inputTitleRef.current?.focus();
      return "Debes completar el Título";
    }

    if (!form.subtitle) {
      inputSubtitleRef.current?.focus();
      return "Debes rellenar el Subtítulo";
    }

    if (!form.body) {
      inputBodyRef.current?.focus();
      return "Debes completar el Cuerpo";
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorData(validationError);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("body", form.body);
      formData.append("status", form.status);
      formData.append("user_id", form.user_id);

      if (form.image) formData.append("image", form.image);

      if (editando) {
        await actualizarDocumento(
          {
            id: docEditar.id,
            data: formData,
          },
          token,
        );

        successToast(
          "Documento actualizado",
          "Se ha actualizado la lista de documentos",
        );

        setDocEditar(null);
      } else {
        await crearDocumento(formData, token);
        successToast(
          "Documento creado",
          "Se ha actualizado la lista de documentos",
        );
      }

      await recargarLista();
      handleResetForm();
      salir();
    } catch (err) {
      errorToast("Error", "Error creando/actulizando doc.");
      setError("Error en la petición");
      console.error(err);
    }
  };

  if (error)
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-white/20 backdrop-blur-sm z-50"
        onClick={salir}
      />
      <motion.div
        {...fadeAnimation2}
        className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:w-[50dvw] md:w-[75dvw] sm:w-[80dvw] w-[90dvw] z-50"
      >
        <div className="relative bg-black py-14 px-12">
          {!editando && (
            <motion.div
              {...fadeAnimation2}
              className="relative flex flex-row items-center justify-center mb-10"
            >
              <button
                onClick={salir}
                className="absolute top-1/2 -translate-y-1/2 left-5 px-4 text-white rounded-full hover:cursor-pointer"
              >
                <ChevronLeft className="w-6 h-auto" />
              </button>
              <p className="text-center">
                {documentos.length === 0
                  ? "Creando tu primer documento"
                  : "Crear nuevo documento"}
              </p>
            </motion.div>
          )}

          {editando && (
            <motion.div
              {...fadeAnimation2}
              className="flex flex-row justify-between items-center pb-12"
            >
              <button
                onClick={salir}
                className="px-4 text-white rounded-full hover:cursor-pointer"
              >
                <ChevronLeft className="w-6 h-auto" />
              </button>
              <p>Actualizando - {index + 1}</p>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-row justify-between text-lg">
              <label htmlFor="title" className="flex-1">
                Título
              </label>
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="off"
                autoCorrect="off"
                ref={inputTitleRef}
                value={form.title}
                onChange={handleChange}
                className="flex-1 px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
              />
            </div>

            <div className="flex flex-row justify-between text-lg">
              <label htmlFor="subtitle" className="flex-1">
                Subtítulo
              </label>
              <input
                type="text"
                name="subtitle"
                id="subtitle"
                autoComplete="off"
                autoCorrect="off"
                ref={inputSubtitleRef}
                value={form.subtitle}
                onChange={handleChange}
                className="flex-1 px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
              />
            </div>

            <div className="flex flex-row justify-between text-lg">
              <label htmlFor="body" className="flex-1">
                Cuerpo
              </label>
              <textarea
                name="body"
                id="body"
                autoComplete="off"
                autoCorrect="off"
                rows={4}
                ref={inputBodyRef}
                value={form.body}
                onChange={handleChange}
                className="overflow-y-auto flex-1 px-3 py-1.5 text-base resize-none border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
              ></textarea>
            </div>

            <div className="flex flex-row justify-between text-lg">
              <label htmlFor="status" className="flex-1">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={form.status}
                onChange={handleChange}
                className="flex-1 px-3 py-1.5 text-base border border-white/30 focus:outline-none focus:ring-3 focus:ring-white/30 focus:border-white/60 transition-all transform duration-200"
              >
                <option
                  value="pendiente"
                  className="bg-black text-base border border-white/60"
                >
                  Pendiente
                </option>
                <option
                  value="publicado"
                  className="bg-black text-base border border-white/60"
                >
                  Publicado
                </option>
                <option
                  value="eliminado"
                  className="bg-black text-base border border-white/60"
                >
                  Eliminado
                </option>
              </select>
            </div>

            <div className="flex flex-row justify-between text-lg">
              <label htmlFor="image">Subir imagen</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image: e.target.files[0] }))
                }
                className="border"
              />
            </div>
            {editando ? (
              <motion.div
                {...fadeAnimation}
                className="flex flex-row gap-2 w-full justify-around pt-6 pb-10"
              >
                <button
                  type="submit"
                  className="w-full py-2 bg-white text-black hover:opacity-85 transition-all transform duration-250"
                >
                  Actualizar
                </button>
              </motion.div>
            ) : (
              <motion.div
                {...fadeAnimation}
                className="flex flex-row w-full justify-around pt-6 pb-10"
              >
                <motion.button
                  type="submit"
                  className="w-full py-2 bg-white text-black hover:opacity-85 transition-all transform duration-250"
                >
                  Crear
                </motion.button>
              </motion.div>
            )}
          </form>

          <div className="flex flex-row justify-between items-center text-sm geist-mono tracking-tight ">
            <div>
              <button
                onClick={handleResetForm}
                className={`${!form.title || !form.subtitle || !form.body ? "text-white/30" : "text-white/70"} transition-all transform duration-200 hover:cursor-pointer`}
              >
                Limpiar Todo
              </button>
            </div>
            {errorData && (
              <motion.div {...fadeAnimation} className="text-[#FF2D55]">
                {errorData}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
