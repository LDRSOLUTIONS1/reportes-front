import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import RepeaterField from "../../../../Components/Forms/RepeaterField";
import MethodGet from "../../../../Config/Service";

const TEMAS = [
  { id: "back_order", nombre: "Back Order" },
  { id: "bonos", nombre: "Bonos" },
  { id: "estado_cuenta", nombre: "Estado de cuenta" },
  { id: "estrategia_marketing", nombre: "Estrategía Marketing" },
  { id: "facturacion", nombre: "Facturación" },
  { id: "fuerza_ventas", nombre: "Fuerza de ventas" },
  { id: "inventario_facturado", nombre: "Inventario Facturado" },
  { id: "inventario_fisico", nombre: "Inventario Fisico" },
  { id: "notas_credito", nombre: "Notas de crédito" },
  { id: "pedidos_nuevos", nombre: "Pedidos nuevos" },
  { id: "plan_comercial", nombre: "Plan Comercial" },
  { id: "plan_piso", nombre: "Plan Piso" },
  { id: "posventa", nombre: "Posventa" },
  { id: "programacion_citas", nombre: "Programación de citas" },
  { id: "prospeccion_leads", nombre: "Prospección/ Leads" },
  { id: "retail", nombre: "Retail" },
];

const StepDistribuidorAgenda = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [distribuidores, setDistribuidores] = useState([]);

  useEffect(() => {
    MethodGet("https://apiclientes.ldrhumanresources.com/api/distribuidores")
      .then((res) => setDistribuidores(res.data))
      .catch(console.log);
  }, []);

  const distribuidorSeleccionado = watch("distribuidor_id");

  useEffect(() => {
    if (!distribuidorSeleccionado) return;

    const distribuidor = distribuidores.find(
      (d) => d.id === Number(distribuidorSeleccionado),
    );

    if (distribuidor) {
      setValue("plaza", distribuidor.plaza);
      setValue("grupo", distribuidor.grupo);
    }
  }, [distribuidorSeleccionado, distribuidores, setValue]);

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Información General
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller
          name="distribuidor_id"
          control={control}
          rules={{ required: "Seleccione un distribuidor" }}
          render={({ field }) => (
            <Autocomplete
              options={distribuidores}
              value={distribuidores.find((d) => d.id === field.value) || null}
              onChange={(_, value) => {
                field.onChange(value?.id || null);

                setValue("plaza", value?.plaza || "");
                setValue("grupo", value?.grupo || "");
              }}
              getOptionLabel={(option) =>
                `${option.nombre_comercial} - ${option.razon_social}`
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Distribuidor"
                  error={!!errors.distribuidor_id}
                  helperText={errors.distribuidor_id?.message}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          label="Plaza"
          InputLabelProps={{ shrink: true }}
          InputProps={{ readOnly: true }}
          {...register("plaza")}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          label="Grupo"
          InputLabelProps={{ shrink: true }}
          InputProps={{ readOnly: true }}
          {...register("grupo")}
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Agenda
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="body2" fontWeight={600} gutterBottom>
          Lista de participantes
        </Typography>

        <RepeaterField
          name="participantes"
          addLabel="Agregar participante"
          emptyMessage="Sin participantes"
          minRows={0}
          maxRows={5}
          columns={[
            {
              name: "nombre",
              label: "Nombre",
              type: "text",
              rules: { required: "Requerido" },
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="body2" fontWeight={600} gutterBottom>
          Temas a revisar
        </Typography>

        <Grid container>
          {TEMAS.map((tema) => (
            <Grid key={tema.id} size={{ xs: 6, sm: 4 }}>
              <Controller
                name={`temas_revisados.${tema.id}`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={!!field.value} {...field} />}
                    label={tema.nombre}
                  />
                )}
              />
            </Grid>
          ))}

          <Grid size={{ xs: 6, sm: 4 }}>
            <Controller
              name="temas_revisados.otros"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox checked={!!field.value} {...field} />}
                  label="Otros"
                />
              )}
            />
          </Grid>
        </Grid>

        <Box mt={1}>
          <TextField
            fullWidth
            size="small"
            label="Especifica"
            InputLabelProps={{ shrink: true }}
            {...register("temas_revisados_otro")}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default StepDistribuidorAgenda;
