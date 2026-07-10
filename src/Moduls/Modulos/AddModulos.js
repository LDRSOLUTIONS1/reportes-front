import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { useContext } from "react";
import ModulosContext from "../../Context/Modulos/ModulosContext";

export default function AddModulos({ open, handleClose }) {
  const { CreateModulos } = useContext(ModulosContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    CreateModulos(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo módulo</DialogTitle>
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
                {...register("icon", {
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.icon}
                helperText={errors.icon?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
