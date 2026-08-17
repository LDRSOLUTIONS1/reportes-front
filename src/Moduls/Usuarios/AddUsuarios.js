import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import { useContext } from "react";
import UsuariosContext from "../../Context/Usuarios/UsuariosContext";

export default function AddUsuarios({ open, handleClose, roles }) {
  const { CreateUsuarios } = useContext(UsuariosContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    CreateUsuarios(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo usuario</DialogTitle>
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
                label="Id rh sistema"
                {...register("external_rh_id", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 carácter" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.external_rh_id}
                helperText={errors.external_rh_id?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Nombre del usuario"
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
                label="Correo electrónico"
                {...register("email", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 carácter" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                select
                fullWidth
                label="Selecciona un rol"
                {...register("rol_id", {
                  required: "Debes seleccionar un rol",
                })}
                error={!!errors.rol_id}
                helperText={errors.rol_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un rol --</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
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
