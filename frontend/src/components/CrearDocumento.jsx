/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { crearDocumento, actualizarDocumento } from "../api/listasApi";
import {
  fadeAnimation,
  fadeAnimation2,
  fadeAnimation3,
} from "../utils/animation";
import { successToast, errorToast } from "../utils/sileoToast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, UploadCloud, X } from "lucide-react";
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
  const MAX_SIZE = 2 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const [form, setForm] = useState(initialForm);
  const editando = Boolean(docEditar);
  const [errorData, setErrorData] = useState("");
  const [error, setError] = useState("");
  const inputTitleRef = useRef(null);
  const inputSubtitleRef = useRef(null);
  const inputBodyRef = useRef(null);
  const inputFileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleResetForm = () => {
    setDocEditar(null);
    setErrorData("");

    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }

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

      if (docEditar.image) {
        setPreview(`${import.meta.env.VITE_BACKEND_URL}${docEditar.image}`);
      } else {
        setPreview(null);
      }

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
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorData("Formato no válido [JPEG, PNG, WEBP]");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      setErrorData("Imagen demasiado grande - máx 2 MB");
      e.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);

    setPreview(null);
    setForm((prev) => ({
      ...prev,
      image: null,
    }));

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
      errorToast("Error", "Error creando/actualizando doc.");
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
            {/* INPUT TÍTULO */}
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

            {/* INPUT SUBTÍTULO */}
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

            {/* INPUT CUERPO */}
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

            {/* INPUT STATUS */}
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

            {/* INPUT FILE UPDATE */}
            <div className="space-y-4">
              <input
                ref={inputFileRef}
                id="image"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.label
                    key="upload"
                    htmlFor="image"
                    layout
                    {...fadeAnimation3}
                    className="group flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/2 transition-all duration-300 hover:border-white/50 hover:bg-white/4"
                  >
                    <UploadCloud className="mb-3 h-8 w-8 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-white" />

                    <p className="font-medium">
                      Arrastra una imagen o{" "}
                      <span className="underline">selecciónala</span>
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      JPEG · PNG · WEBP · máximo 2 MB
                    </p>
                  </motion.label>
                ) : (
                  <motion.div
                    key="preview"
                    layout
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.28,
                    }}
                    className="rounded-xl border border-white/15 bg-white/3 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={preview}
                        alt={"imagen documento"}
                        className="h-20 w-20 rounded-lg object-cover ring-1 ring-white/10"
                      />

                      <div className="flex-1">
                        <p className="font-medium">
                          {form.image?.name || "Imagen actual"}
                        </p>

                        {form.image && (
                          <p className="mt-1 text-sm text-white/40">
                            {(form.image.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        )}

                        <div className="mt-4 flex items-center gap-6">
                          <label
                            htmlFor="image"
                            className="cursor-pointer text-sm text-white/60 transition-colors hover:text-white"
                          >
                            Cambiar imagen
                          </label>

                          <button
                            type="button"
                            onClick={removeImage}
                            className="text-sm text-[#FF2D55] hover:opacity-80 transition-all"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{
                          rotate: 90,
                          scale: 1.1,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        type="button"
                        onClick={removeImage}
                        className="
              self-start
              rounded-full
              p-2
              text-white/40
              transition-colors
              hover:bg-white/10
              hover:text-white
            "
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
