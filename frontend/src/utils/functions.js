export function obtenerGravatarAleatorio() {
  // Lista con los códigos exactos que pide Gravatar
  const estilos = ["mp", "monsterid", "wavatar", "retro", "robohash"];

  // Selecciona un índice al azar de la lista
  const estiloAzar = estilos[Math.floor(Math.random() * estilos.length)];

  // Devuelve la URL completa estructurada
  return `https://gravatar.com/avatar/?d=${estiloAzar}`;
}

export function formatearFecha(fecha) {
  if (!fecha) return "";

  const date = new Date(fecha);

  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");

  return `${dia}/${mes}`;
}

export function debounce(fn, delay = 300) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
