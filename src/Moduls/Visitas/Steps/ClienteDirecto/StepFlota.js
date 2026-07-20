import React from "react";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const StepFlota = () => (
  <RepeaterField
    name="flota"
    addLabel="Agregar vehículo"
    minRows={0}
    maxRows={25}
    columns={[
      {
        name: "marca",
        label: "Marca",
        type: "text",
        rules: { required: "Requerido" },
      },
      {
        name: "modelo",
        label: "Modelo",
        type: "text",
        rules: { required: "Requerido" },
      },
      {
        name: "carga",
        label: "Cap. de carga",
        type: "number",
        rules: { required: "Requerido" },
      },
      {
        name: "cantidad",
        label: "Cantidad",
        type: "number",
        rules: { required: "Requerido" },
      },
      {
        name: "flota",
        label: "Flota",
        type: "number",
        rules: { required: "Requerido" },
      },
      {
        name: "comentarios_aplicacion",
        label: "Comentarios/Aplicación",
        type: "text",
        rules: { required: "Requerido" },
      },
      {
        name: "edad_promedio",
        label: "Edad promedio de su flota",
        type: "text",
        rules: { required: "Requerido" },
      },
    ]}
  />
);

export default StepFlota;
