export const dateFormatter = (dateString) => {
  if (!dateString) return "";

  let fecha;
  let mostrarHora = false;

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    fecha = new Date(year, month - 1, day);
  } else {
    fecha = new Date(dateString.replace(" ", "T"));
    mostrarHora = true;
  }

  if (isNaN(fecha)) return "";

  const opcionesFecha = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const fechaTexto = fecha.toLocaleDateString("es-MX", opcionesFecha);

  if (!mostrarHora) {
    return fechaTexto;
  }

  const horaTexto = fecha.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${fechaTexto} - ${horaTexto}`;
};
