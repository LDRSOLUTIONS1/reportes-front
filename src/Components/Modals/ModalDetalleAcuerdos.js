import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { dateFormatter } from "../../Utils/dateFormatter";
import { StatusChip } from "../../Utils/StatusChip";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import Chip from "@mui/material/Chip";

const ModalDetalleAcuerdos = ({ open, handleClose, acuerdo }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  if (!acuerdo) return null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const visitReport = acuerdo.visit_report;

  const getClienteDistribuidor = () => {
    if (!visitReport) return "-";

    if (visitReport.visit_type === "cliente_directo") {
      return (
        visitReport.client_visit?.razon_social || "Cliente directo sin nombre"
      );
    }

    if (visitReport.visit_type === "distribuidor") {
      return (
        visitReport.distributor_visit?.distribuidor || "Distribuidor sin nombre"
      );
    }

    return "-";
  };

  const getTipoVisita = () => {
    if (!visitReport) return "-";

    if (visitReport.visit_type === "cliente_directo") {
      return "Cliente directo";
    }

    if (visitReport.visit_type === "distribuidor") {
      return "Distribuidor";
    }

    return "-";
  };

  const getUbicacion = () => {
    if (!visitReport) return "-";

    if (visitReport.visit_type === "distribuidor") {
      const distributor = visitReport.distributor_visit;

      return (
        [distributor?.grupo, distributor?.plaza].filter(Boolean).join(" · ") ||
        "-"
      );
    }

    if (visitReport.visit_type === "cliente_directo") {
      return (
        visitReport.client_visit?.plaza ||
        visitReport.client_visit?.ciudad ||
        "-"
      );
    }

    return "-";
  };

  const dates = acuerdo.dates ?? [];
  const original =
    dates.find((d) => d.numero_reprogramacion === 0)?.fecha_compromiso ??
    acuerdo.fecha_compromiso;
  const vigente = dates.find((d) => d.estado === 2) ?? dates[dates.length - 1];
  const fechaVigente = vigente?.fecha_compromiso ?? acuerdo.fecha_compromiso;
  const reprogramaciones = dates.length > 1 ? dates.length - 1 : 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Detalle del acuerdo y actividad
            </Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          px: { xs: 1, sm: 3 },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 48,

            "& .MuiTab-root": {
              minHeight: 48,
              textTransform: "none",
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Información" />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: { xs: 2, sm: 4 } }}>
        {value === 0 && (
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                Información de la visita
              </Typography>

              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Table>
                  <TableBody>
                    {[
                      {
                        label: "Cliente / Distribuidor",
                        value: getClienteDistribuidor(),
                      },
                      {
                        label: "Tipo de visita",
                        value: getTipoVisita(),
                      },
                      {
                        label: "Grupo / Plaza",
                        value: getUbicacion(),
                      },
                      {
                        label: "Regional",
                        value: visitReport?.user?.name,
                      },
                    ].map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            width: "35%",
                            borderRight: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          {row.label}
                        </TableCell>

                        <TableCell sx={{ fontWeight: 500 }}>
                          {row.value || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                Información del acuerdo
              </Typography>

              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Table>
                  <TableBody>
                    {[
                      {
                        label: "ID",
                        value: acuerdo.id,
                      },
                      {
                        label: "Acuerdo",
                        value: acuerdo.acuerdo,
                      },
                      {
                        label: "Responsable",
                        value: acuerdo.responsable,
                      },
                      {
                        label: "Actividad / Seguimiento",
                        value: acuerdo.seguimiento,
                      },

                      {
                        label: "Status",
                        value: <StatusChip estado={acuerdo.status} />,
                      },
                      {
                        label: "Motivo de cancelación",
                        value: acuerdo.motivo_cancelacion,
                      },
                      {
                        label: "Fecha de completado",
                        value:
                          acuerdo.status === 2 && acuerdo.completado_at
                            ? dateFormatter(acuerdo.completado_at)
                            : "-",
                      },

                      {
                        label: "Fecha de compromiso original",
                        value: dateFormatter(original),
                      },
                      {
                        label: "Fecha vigente",
                        value: dateFormatter(fechaVigente),
                      },
                    ].map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            width: "35%",
                            borderRight: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          {row.label}
                        </TableCell>

                        <TableCell sx={{ fontWeight: 500 }}>
                          {row.value || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {reprogramaciones > 0 && (
              <Box>
                <Stack
                  direction="row"
                  spacing={0.75}
                  alignItems="center"
                  sx={{ mb: 1.5 }}
                >
                  <EventRepeatIcon sx={{ fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Historial de reprogramaciones ({reprogramaciones})
                  </Typography>
                </Stack>

                <TableContainer
                  component={Paper}
                  sx={{
                    borderRadius: 2,
                    boxShadow: "none",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Table>
                    <TableBody>
                      {dates
                        .slice()
                        .sort(
                          (a, b) =>
                            a.numero_reprogramacion - b.numero_reprogramacion,
                        )
                        .map((d, index) => (
                          <TableRow
                            key={d.id}
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: theme.palette.action.hover,
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                width: "35%",
                                borderRight: `1px solid ${theme.palette.divider}`,
                              }}
                            >
                              {d.numero_reprogramacion === 0
                                ? "Fecha original"
                                : `Reprogramación ${d.numero_reprogramacion}`}
                            </TableCell>

                            <TableCell sx={{ fontWeight: 500 }}>
                              <Stack spacing={0.5}>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                  flexWrap="wrap"
                                >
                                  <span>
                                    {dateFormatter(d.fecha_compromiso)}
                                  </span>
                                  {/* {d.estado === 2 && (
                                    <Chip
                                      label="Pendiente"
                                      size="small"
                                      color="warning"
                                      sx={{ height: 18, fontSize: 10 }}
                                    />
                                  )} */}
                                </Stack>

                                {d.motivo_reprogramacion && (
                                  <Typography
                                    variant="caption"
                                    sx={{ color: theme.palette.text.secondary }}
                                  >
                                    Motivo: {d.motivo_reprogramacion}
                                  </Typography>
                                )}

                                {d.user?.name && (
                                  <Typography
                                    variant="caption"
                                    sx={{ color: theme.palette.text.disabled }}
                                  >
                                    {d.user.name} ·{" "}
                                    {dateFormatter(d.created_at)}
                                  </Typography>
                                )}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalleAcuerdos;
