import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Autocomplete,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import MethodGet from "../../../../Config/Service";
import SelectField from "../../../../Components/Forms/Select";

const StepRequerimientos = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [distribuidores, setDistribuidores] = useState([]);

  useEffect(() => {
    MethodGet("https://apiclientes.ldrhumanresources.com/api/distribuidores")
      .then((res) => setDistribuidores(res.data))
      .catch(console.log);
  }, []);

  const financiamientos = [
    { id: "credito_casa", nombre: "Crédito Casa" },
    { id: "arrendamiento", nombre: "Arrendamiento" },
    { id: "contado", nombre: "Contado" },
    { id: "otro", nombre: "Otro" },
  ];

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
        <SelectField
          name="financiamiento"
          label="Financiamiento"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          errors={errors}
          options={financiamientos}
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
        <Controller
          name="distribuidor"
          control={control}
          rules={{
            required: "Este campo es obligatorio",
          }}
          render={({ field }) => (
            <Autocomplete
              freeSolo
              options={distribuidores}
              getOptionLabel={(option) =>
                typeof option === "string"
                  ? option
                  : option.nombre_comercial || ""
              }
              value={field.value || ""}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  field.onChange(newValue);
                } else if (newValue) {
                  field.onChange(newValue.nombre_comercial);
                } else {
                  field.onChange("");
                }
              }}
              onInputChange={(event, newInputValue) => {
                field.onChange(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Distribuidor"
                  error={!!errors.distribuidor}
                  helperText={errors.distribuidor?.message}
                />
              )}
            />
          )}
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
