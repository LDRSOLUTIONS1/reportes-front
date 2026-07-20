import React from "react";
import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const StepCapacitacion = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Tipo"
          InputLabelProps={{ shrink: true }}
          {...register("tipo", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.tipo}
          helperText={errors.tipo?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Tema principal:"
          InputLabelProps={{ shrink: true }}
          {...register("tema_principal", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.tema_principal}
          helperText={errors.tema_principal?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="N° Personas capacitadas"
          InputLabelProps={{ shrink: true }}
          {...register("personas_capacitadas", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.personas_capacitadas}
          helperText={errors.personas_capacitadas?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Comentarios"
          InputLabelProps={{ shrink: true }}
          {...register("comentarios", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.comentarios}
          helperText={errors.comentarios?.message}
        />
      </Grid>
    </Grid>
  );
};

export default StepCapacitacion;
