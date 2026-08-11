import React from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { dateFormatter } from "../../Utils/dateFormatter";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { EstadoChip } from "../../Utils/EstadoChip";
import { esES } from "@mui/x-data-grid/locales";
import { useNavigate } from "react-router-dom";

export default function TableVisitas({ rows = [] }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const visit_type = [
    { id: "cliente_directo", nombre: "Cliente directo" },
    { id: "distribuidor", nombre: "Distribuidor" },
  ];

  const tipo_visita = [
    { id: "presentacion_comercial", nombre: "Presentación comercial" },
    { id: "capacitacion_operativa", nombre: "Capacitación operativa" },
    { id: "capacitacion_producto", nombre: "Capacitación producto" },
    { id: "acompanamiento_comercial", nombre: "Acompañamiento comercial" },
    { id: "operativa", nombre: "Operativa" },
    { id: "otro", nombre: "Otro" },
  ];

  const visitTypeMap = Object.fromEntries(
    visit_type.map((item) => [item.id, item.nombre]),
  );

  const tipoVisitaMap = Object.fromEntries(
    tipo_visita.map((item) => [item.id, item.nombre]),
  );

  const columns = [
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 50,
      type: "actions",
      getActions: (params) => {
        const actions = [
          <GridActionsCellItem
            icon={<VisibilityIcon sx={{ color: "#42A5F5" }} />}
            label="Ver detalles"
            onClick={() => navigate(`/DetalleVisita/${params.id}`)}
          />,
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "#ed6c02" }} />}
            label="Editar"
            onClick={() => navigate(`/EditarVisita/${params.id}`)}
          />,
        ];
        return actions;
      },
    },
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "destinatario",
      headerName: "Cliente / Distribuidor",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      valueGetter: (_, row) => {
        if (row.visit_type === "cliente_directo") {
          return row.client_visit?.razon_social ?? "Sin cliente";
        }

        if (row.visit_type === "distribuidor") {
          return row.distributor_visit?.distribuidor ?? "Sin distribuidor";
        }

        return "Sin información";
      },
    },
    {
      field: "user",
      headerName: "Regional",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 180,

      valueGetter: (_, row) => {
        const name = row.user?.name;
        const email = row.user?.email;

        if (!name && !email) return "Sin regional";

        return `${name ?? "Sin nombre"} - ${email ?? "Sin email"}`;
      },
    },
    {
      field: "tipo_visita",
      headerName: "Tipo de visita",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      valueGetter: (_, row) =>
        tipoVisitaMap[row.tipo_visita] ?? row.tipo_visita,
    },
    {
      field: "objetivo",
      headerName: "Objetivo de la visita",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "logros_estrategia",
      headerName: "Logros/Estrategia",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "segmento",
      headerName: "Segmento",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "fecha_visita",
      headerName: "Fecha de la visita",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 220,
      valueGetter: (_, row) => {
        const inicio = dateFormatter(row.fecha_inicio);
        const fin = dateFormatter(row.fecha_fin);

        if (!row.fecha_fin || row.fecha_inicio === row.fecha_fin) {
          return inicio;
        }

        return `${inicio} - ${fin}`;
      },
    },
    {
      field: "created_at",
      headerName: "Creado en",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => dateFormatter(params.value),
    },
  ];

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #000000",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Lista de visitas
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: isMobile ? 400 : 500,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            showToolbar
            autoHeight={isMobile}
            checkboxSelection={false}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
              sorting: {
                sortModel: [{ field: "id", sort: "desc" }],
              },
            }}
            slots={{
              toolbar: () => (
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={600}>Total: {rows.length}</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/NuevaVisita")}
                    sx={{ borderRadius: 3 }}
                  >
                    Nueva visita
                  </Button>
                </Box>
              ),
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.grey[100],
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: 0.5,
                borderBottom: `2px solid ${theme.palette.primary.main}`,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `2px solid ${theme.palette.primary.main}`,
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #000000",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },

              "& .MuiDataGrid-columnSeparator": {
                opacity: 0.3,
                cursor: "col-resize",
              },

              "& .MuiDataGrid-columnSeparator:hover": {
                opacity: 1,
                color: theme.palette.primary.main,
              },

              "& .MuiDataGrid-columnHeader:active .MuiDataGrid-columnSeparator":
                {
                  color: theme.palette.primary.main,
                  width: 2,
                },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.action.hover,
                transition: "0.2s ease-in-out",
              },
            }}
          />
        </Box>
      </Paper>
    </>
  );
}
