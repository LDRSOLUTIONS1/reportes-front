import React from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import SelectField from "../../../../Components/Forms/Select";

const StepClienteDatos = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const logoPreview = watch("logo_preview");

  const tipo_cliente = [
    { id: "conquista", nombre: "Conquista" },
    { id: "actual", nombre: "Actual" },
    { id: "prospecto", nombre: "Prospecto" },
  ];

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (logoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
    }

    setValue("logo_file", file);
    setValue("logo_preview", URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    if (logoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
    }

    setValue("logo_file", null);
    setValue("logo_preview", "");
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Razón social"
          InputLabelProps={{ shrink: true }}
          {...register("razon_social", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.razon_social}
          helperText={errors.razon_social?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Ubicaciones"
          InputLabelProps={{ shrink: true }}
          {...register("ubicaciones", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.ubicaciones}
          helperText={errors.ubicaciones?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Tamaño de flota"
          InputLabelProps={{ shrink: true }}
          {...register("tamanio_flota", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.tamanio_flota}
          helperText={errors.tamanio_flota?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Giro"
          InputLabelProps={{ shrink: true }}
          {...register("giro", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.giro}
          helperText={errors.giro?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Rutas"
          InputLabelProps={{ shrink: true }}
          {...register("rutas", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.rutas}
          helperText={errors.rutas?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Cobertura"
          InputLabelProps={{ shrink: true }}
          {...register("cobertura", {
            required: "Este campo es obligatorio",
            minLength: { value: 1, message: "Mínimo 1 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
          })}
          error={!!errors.cobertura}
          helperText={errors.cobertura?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <SelectField
          name="tipo_cliente"
          label="Tipo de cliente"
          control={control}
          rules={{ required: "Este campo es obligatorio" }}
          errors={errors}
          options={tipo_cliente}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={logoPreview}
            variant="rounded"
            sx={{ width: 56, height: 56 }}
          />

          <Box display="flex" flexDirection="column" gap={1}>
            <Button variant="outlined" component="label" size="small">
              Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleLogoChange}
              />
            </Button>

            {logoPreview && (
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={handleRemoveLogo}
              >
                Eliminar
              </Button>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default StepClienteDatos;
