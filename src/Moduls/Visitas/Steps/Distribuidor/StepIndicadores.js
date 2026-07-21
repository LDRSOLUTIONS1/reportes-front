import React from "react";
import { Typography } from "@mui/material";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const StepIndicadores = () => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Indicadores Comerciales
      </Typography>

      <RepeaterField
        name="commercial_indicators"
        addLabel="Agregar modelo"
        emptyMessage="Sin indicadores registrados"
        minRows={0}
        columns={[
          {
            name: "modelo",
            label: "Modelo",
            type: "text",
            rules: {
              required: "Requerido",
              maxLength: { value: 255, message: "Máximo 255 caracteres" },
            },
          },
          {
            name: "bp_2025",
            label: "BP 2025",
            type: "number",
            rules: { min: { value: 0, message: "Mínimo 0" } },
          },
          {
            name: "whole_ytd",
            label: "Whole YTD",
            type: "number",
            rules: { min: { value: 0, message: "Mínimo 0" } },
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
            name: "retail_ytd",
            label: "Retail YTD",
            type: "number",
            rules: { min: { value: 0, message: "Mínimo 0" } },
          },
          {
            name: "inventario",
            label: "Inventario",
            type: "number",
            rules: { min: { value: 0, message: "Mínimo 0" } },
          },
          {
            name: "back_order",
            label: "B.O.",
            type: "number",
            rules: { min: { value: 0, message: "Mínimo 0" } },
          },
        ]}
      />
    </>
  );
};

export default StepIndicadores;
