import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";

import Layout from "../../Components/Layout/Layout";
import AuthContext from "../../Context/Auth/AuthContext";

const getSaludo = () => {
  const hora = new Date().getHours();

  if (hora >= 5 && hora < 12) return "Buenos días";
  if (hora >= 12 && hora < 19) return "Buenas tardes";

  return "Buenas noches";
};

const getNombreRol = (roleId) => {
  const roles = {
    1: "Super Administrador",
    2: "Administrador",
    3: "Interno",
    4: "Externo",
    5: "Gubernamental",
    6: "Distribuidor",
  };

  return roles[Number(roleId)] || "Usuario";
};

const getEstado = (estado) => {
  const estados = {
    1: "Inactivo",
    2: "Activo",
  };

  return estados[Number(estado)] || "Sin definir";
};

const Inicio = () => {
  const { usuario, loading } = useContext(AuthContext);

  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    setSaludo(getSaludo());
  }, []);

  const user = usuario?.user;

  const nombreUsuario = user?.name || "Usuario";

  const roleId = user?.role_id;

  return (
    <Layout>
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 5 },
          py: { xs: 3, md: 5 },
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">
              Cargando información del usuario...
            </Typography>
          </Box>
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                mb: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                background:
                  "linear-gradient(135deg, rgba(25,118,210,0.08), rgba(255,255,255,1))",
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      mb: 1,
                      fontSize: {
                        xs: "1.8rem",
                        md: "2.3rem",
                      },
                    }}
                  >
                    {saludo}, {nombreUsuario} 👋
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 700 }}
                  >
                    Bienvenido al sistema de{" "}
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    >
                      Informes de Visitas Comerciales
                    </Box>
                    .
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    Desde este sistema puedes consultar y gestionar la
                    información relacionada con las visitas comerciales.
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "center",
                      md: "flex-end",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 110,
                      height: 110,
                      fontSize: 42,
                      bgcolor: "primary.main",
                    }}
                  >
                    {nombreUsuario.charAt(0).toUpperCase()}
                  </Avatar>
                </Grid>
              </Grid>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  Información de mi cuenta
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Información del usuario autenticado
                </Typography>
              </Box>

              <Divider />

              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.50",
                          color: "primary.main",
                        }}
                      >
                        <PersonIcon />
                      </Avatar>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Nombre
                        </Typography>

                        <Typography fontWeight={600}>
                          {user?.name || "No disponible"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.50",
                          color: "primary.main",
                        }}
                      >
                        <EmailIcon />
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary">
                          Correo electrónico
                        </Typography>

                        <Typography
                          fontWeight={600}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user?.email || "No disponible"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.50",
                          color: "primary.main",
                        }}
                      >
                        <BadgeIcon />
                      </Avatar>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          No. de colaborador
                        </Typography>

                        <Typography fontWeight={600}>
                          {user?.collaborator_number || "No disponible"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.50",
                          color: "primary.main",
                        }}
                      >
                        <PersonIcon />
                      </Avatar>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Rol
                        </Typography>

                        <Box sx={{ mt: 0.5 }}>
                          <Chip
                            label={getNombreRol(roleId)}
                            size="small"
                            color="primary"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.50",
                          color: "primary.main",
                        }}
                      >
                        <LocationOnIcon />
                      </Avatar>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Ubicación
                        </Typography>

                        <Typography fontWeight={600}>
                          {user?.location_name || "No asignada"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.50",
                          color: "primary.main",
                        }}
                      >
                        <BusinessIcon />
                      </Avatar>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Marca
                        </Typography>

                        <Typography fontWeight={600}>
                          {user?.brand || "No asignada"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ mb: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Estado de la cuenta:
                      </Typography>

                      <Chip
                        label={getEstado(user?.estado)}
                        color={
                          Number(user?.estado) === 1 ? "success" : "default"
                        }
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Inicio;
