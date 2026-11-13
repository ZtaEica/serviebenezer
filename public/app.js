// El número se toma del enlace del botón principal (inyectado por server.js)
const number = document.querySelector(".btn-sm").href.match(/wa\.me\/(\d+)/)[1];

document.getElementById("wa-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const lines = [
    "Hola, quiero una cotización de fumigación.",
    `Nombre: ${d.nombre}`,
    `Plaga: ${d.plaga}`,
    d.zona && `Zona: ${d.zona}`,
    d.detalle && `Detalles: ${d.detalle}`,
  ].filter(Boolean);
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
});
