import React from "react";
import {
  Grid,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const EVENTOS = [
  { id: "china", nombre: "China" },
  { id: "torneo_golf", nombre: "Torneo Golf" },
  { id: "f1", nombre: "F1" },
  { id: "expo_transporte", nombre: "Expo Transporte" },
  { id: "super_copa", nombre: "Super Copa" },
  { id: "cuernos_chuecos", nombre: "Cuernos Chuecos" },
];

const StepHistorialEventos = () => {
  const { register, control } = useFormContext();

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Historial de ventas FOTON
        </Typography>

        <RepeaterField
          name="sales_history"
          addLabel="Agregar año"
          emptyMessage="Sin historial registrado"
          minRows={0}
          columns={[
            {
              name: "anio",
              label: "Año",
              type: "number",
              rules: {
                required: "El año es requerido",
                min: {
                  value: 2000,
                  message: "Año inválido",
                },
              },
            },
            {
              name: "cantidad",
              label: "Cantidad",
              type: "number",
              rules: {
                required: "La cantidad es requerida",
                min: {
                  value: 0,
                  message: "Debe ser mayor o igual a 0",
                },
              },
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Eventos a los que asistió
        </Typography>

        <FormGroup>
          {EVENTOS.map((evento) => (
            <Controller
              key={evento.id}
              name={`eventos_asistio.${evento.id}`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox checked={!!field.value} {...field} />}
                  label={evento.nombre}
                />
              )}
            />
          ))}
        </FormGroup>

        <Box mt={1}>
          <TextField
            fullWidth
            size="small"
            label="Otro"
            InputLabelProps={{ shrink: true }}
            {...register("eventos_asistio_otro")}
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Eventos a los que es candidato
        </Typography>

        <FormGroup>
          {EVENTOS.map((evento) => (
            <Controller
              key={evento.id}
              name={`eventos_candidato.${evento.id}`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox checked={!!field.value} {...field} />}
                  label={evento.nombre}
                />
              )}
            />
          ))}
        </FormGroup>

        <Box mt={1}>
          <TextField
            fullWidth
            size="small"
            label="Otro"
            InputLabelProps={{ shrink: true }}
            {...register("eventos_candidato_otro")}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default StepHistorialEventos;
