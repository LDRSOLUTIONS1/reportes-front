import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import MethodGet from "../../Config/Service";
import ModulosContext from "../../Context/Modulos/ModulosContext";

export default function EditModulos({ open, handleClose, id }) {
  const { EditModulos } = useContext(ModulosContext);

  const [modulo, setModulo] = useState(null);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      estado: "",
    },
  });

  useEffect(() => {
    if (!id) return;

    MethodGet(`/modulos/${id}`)
      .then((res) => {
        setModulo(res.data);
      })
      .catch(console.log);
  }, [id]);

  useEffect(() => {
    if (modulo) {
      reset({
        name: modulo.name || "",
        title: modulo.title || "",
        segment: modulo.segment || "",
        icon: modulo.icon || "",
        estado: modulo.estado || "",
      });
    }
  }, [modulo, reset]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id,
    };

    EditModulos(payload);
    handleClose();
  };

  const handleDialogClose = () => {
    reset();
    handleClose();
  };

  const estado = [
    { id: 1, nombre: "Inactivo" },
    { id: 2, nombre: "Activo" },
  ];

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar módulo</DialogTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Nombre del módulo"
                InputLabelProps={{ shrink: true }}
                {...register("name", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 carácter" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Titulo del módulo"
                InputLabelProps={{ shrink: true }}
                {...register("title", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 carácter" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Segmento del módulo"
                InputLabelProps={{ shrink: true }}
                {...register("segment", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 carácter" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.segment}
                helperText={errors.segment?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Icono del módulo"
                InputLabelProps={{ shrink: true }}
                {...register("icon", {
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.icon}
                helperText={errors.icon?.message}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="estado"
                control={control}
                rules={{
                  required: "Este campo es obligatorio",
                }}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    label="Estatus"
                    {...field}
                    error={!!errors.estado}
                    helperText={errors.estado?.message}
                  >
                    <MenuItem value="">
                      <em>-- Seleccionar una opción --</em>
                    </MenuItem>

                    {estado.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
          >
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
