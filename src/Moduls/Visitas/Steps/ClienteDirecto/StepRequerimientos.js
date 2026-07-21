import React from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const StepRequerimientos = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Modelo de interés"
          InputLabelProps={{ shrink: true }}
          {...register("modelo_interes", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.modelo_interes}
          helperText={errors.modelo_interes?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Tipo de carrocería"
          InputLabelProps={{ shrink: true }}
          {...register("tipo_carroceria", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.tipo_carroceria}
          helperText={errors.tipo_carroceria?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Proyección de compra"
          InputLabelProps={{ shrink: true }}
          {...register("proyeccion_compra", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.proyeccion_compra}
          helperText={errors.proyeccion_compra?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Financiamiento"
          InputLabelProps={{ shrink: true }}
          {...register("financiamiento", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.financiamiento}
          helperText={errors.financiamiento?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Tiempo de entrega"
          InputLabelProps={{ shrink: true }}
          {...register("tiempo_entrega", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.tiempo_entrega}
          helperText={errors.tiempo_entrega?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Lugar de entrega"
          InputLabelProps={{ shrink: true }}
          {...register("lugar_entrega", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.lugar_entrega}
          helperText={errors.lugar_entrega?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Distribuidor"
          InputLabelProps={{ shrink: true }}
          {...register("distribuidor", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.distribuidor}
          helperText={errors.distribuidor?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormLabel component="legend" sx={{ fontSize: 14, mb: 1 }}>
          Demo
        </FormLabel>
        <Controller
          name="demo"
          control={control}
          defaultValue=""
          rules={{ required: "Selecciona una opción" }}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="si" control={<Radio />} label="Sí" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          )}
        />
        {errors.demo && (
          <FormLabel error sx={{ fontSize: 12, display: "block" }}>
            {errors.demo.message}
          </FormLabel>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Otro"
          InputLabelProps={{ shrink: true }}
          {...register("otro", {
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.otro}
          helperText={errors.otro?.message}
        />
      </Grid>
    </Grid>
  );
};

export default StepRequerimientos;
