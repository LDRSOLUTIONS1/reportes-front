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
import UsuariosContext from "../../Context/Usuarios/UsuariosContext";

export default function EditUsuarios({ open, handleClose, id, roles }) {
  const { EditUsuarios } = useContext(UsuariosContext);

  const [role, setRole] = useState(null);

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

    MethodGet(`/usuarios/${id}`)
      .then((res) => {
        setRole(res.data);
      })
      .catch(console.log);
  }, [id]);

  useEffect(() => {
    if (role) {
      reset({
        external_rh_id: role.external_rh_id || "",
        name: role.name || "",
        email: role.email || "",
        role_id: role.role_id || "",
        estado: role.estado || "",
      });
    }
  }, [role, reset]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id,
    };

    EditUsuarios(payload);
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
      <DialogTitle>Editar usuario</DialogTitle>

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
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
                {...register("name", {
                  required: "Este campo es obligatorio",
                  maxLength: {
                    value: 100,
                    message: "Máximo 100 caracteres",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Correo electrónico"
                InputLabelProps={{ shrink: true }}
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
