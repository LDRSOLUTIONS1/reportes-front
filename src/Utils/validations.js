export const validarCampoObligatorio = (value) => {
  return value?.trim() !== "" || "Este campo es obligatorio";
};
