import React from "react";
import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import SelectField from "../../../Components/Forms/Select";

const StepInformacionGeneral = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const visitType = watch("visit_type");

  const visit_type = [
    { id: "cliente_directo", nombre: "Cliente directo" },
    { id: "distribuidor", nombre: "Distribuidor" },
  ];

  const tipo_visita = [
    { id: "presentacion_comercial", nombre: "Presentación comercial" },
    { id: "capacitacion_operativa", nombre: "Capacitación operativa" },
    { id: "capacitacion_producto", nombre: "Capacitación producto" },
    { id: "acompanamiento_comercial", nombre: "Acompañamiento comercial" },
    { id: "operativa", nombre: "Operativa" },
    { id: "otro", nombre: "Otro" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <SelectField
          name="visit_type"
          label="¿La visita comercial es para?"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          errors={errors}
          options={visit_type}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <SelectField
          name="tipo_visita"
          label="Tipo de visita"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          errors={errors}
          options={tipo_visita}
        />
      </Grid>

      <Grid size={12}>
        <TextField
          fullWidth
          label="Objetivo de la visita"
          InputLabelProps={{ shrink: true }}
          {...register("objetivo", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 1,
              message: "Mínimo 1 carácter",
            },
            maxLength: {
              value: 100,
              message: "Máximo 100 caracteres",
            },
          })}
          error={!!errors.objetivo}
          helperText={errors.objetivo?.message}
        />
      </Grid>

      <Grid size={12}>
        <TextField
          fullWidth
          label="Logros/Estrategia"
          InputLabelProps={{ shrink: true }}
          {...register("logros_estrategia", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 1,
              message: "Mínimo 1 carácter",
            },
            maxLength: {
              value: 100,
              message: "Máximo 100 caracteres",
            },
          })}
          error={!!errors.logros_estrategia}
          helperText={errors.logros_estrategia?.message}
        />
      </Grid>

      <Grid size={12}>
        <TextField
          fullWidth
          label="Segmento"
          InputLabelProps={{ shrink: true }}
          {...register("segmento", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 1,
              message: "Mínimo 1 carácter",
            },
            maxLength: {
              value: 100,
              message: "Máximo 100 caracteres",
            },
          })}
          error={!!errors.segmento}
          helperText={errors.segmento?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          type="date"
          fullWidth
          label="Fecha inicio"
          InputLabelProps={{ shrink: true }}
          {...register("fecha_inicio", {
            required: "Este campo es obligatorio",
          })}
          error={!!errors.fecha_inicio}
          helperText={errors.fecha_inicio?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          type="date"
          fullWidth
          label="Fecha fin"
          InputLabelProps={{ shrink: true }}
          {...register("fecha_fin", {
            required: "Este campo es obligatorio",
          })}
          error={!!errors.fecha_fin}
          helperText={errors.fecha_fin?.message}
        />
      </Grid>
    </Grid>
  );
};

export default StepInformacionGeneral;
