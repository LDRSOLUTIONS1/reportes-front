import React from "react";
import { Typography } from "@mui/material";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const StepAcompanamiento = () => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Datos de Acompañamiento
      </Typography>

      <RepeaterField
        name="leads_pipeline"
        addLabel="Agregar cliente"
        emptyMessage="Sin clientes registrados"
        minRows={0}
        maxRows={11}
        columns={[
          {
            name: "cliente",
            label: "Cliente",
            type: "text",
            rules: { required: "Requerido", maxLength: { value: 255, message: "Máximo 255 caracteres" } },
          },
          {
            name: "modelo_interes",
            label: "Modelo de interés",
            type: "text",
            rules: { maxLength: { value: 255, message: "Máximo 255 caracteres" } },
          },
          {
            name: "porcentaje_avance",
            label: "% Avance",
            type: "number",
            rules: {
              min: { value: 0, message: "Mínimo 0" },
              max: { value: 100, message: "Máximo 100" },
            },
          },
          {
            name: "comentarios",
            label: "Comentarios",
            type: "textarea",
          },
        ]}
      />
    </>
  );
};

export default StepAcompanamiento;