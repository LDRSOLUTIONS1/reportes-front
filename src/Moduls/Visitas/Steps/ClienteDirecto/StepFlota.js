import React from "react";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const StepFlota = () => (
  <RepeaterField
    name="fleet_info"
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
        name: "capacidad_carga",
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
        name: "porcentaje_flota",
        label: "% Flota",
        type: "number",
        rules: {
          min: { value: 0, message: "Mínimo 0" },
          max: { value: 100, message: "Máximo 100" },
        },
      },
      {
        name: "comentarios_aplicacion",
        label: "Comentarios/Aplicación",
        type: "text",
      },
    ]}
  />
);

export default StepFlota;