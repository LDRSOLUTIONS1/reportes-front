import React from "react";
import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import SelectField from "../../../../Components/Forms/Select";

const StepCapacitacion = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const tipos = [
    { id: "tecnica", nombre: "Tecnica" },
    { id: "comercial", nombre: "Comercial" },
    { id: "operativa", nombre: "Operativa" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <SelectField
          name="tipo"
          label="Tipo"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          errors={errors}
          options={tipos}
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
          type="number"
          fullWidth
          label="N° Personas capacitadas"
          InputLabelProps={{ shrink: true }}
          {...register("num_personas", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.num_personas}
          helperText={errors.num_personas?.message}
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
