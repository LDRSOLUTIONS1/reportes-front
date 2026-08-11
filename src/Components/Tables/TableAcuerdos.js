import React, { useContext, useState } from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ModalDetalleAcuerdos from "../Modals/ModalDetalleAcuerdos";
import AcuerdosContext from "../../Context/Acuerdos/AcuerdosContext";
import { dateFormatter } from "../../Utils/dateFormatter";
import { EstadoChip } from "../../Utils/EstadoChip";
import { esES } from "@mui/x-data-grid/locales";
import { StatusChip } from "../../Utils/StatusChip";

export default function TableAcuerdos({ rows = [] }) {
  const { acuerdo, GetAcuerdo } = useContext(AcuerdosContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = async (id) => {
    await GetAcuerdo(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      minWidth: 50,
      type: "actions",
      getActions: (params) => {
        const actions = [
          <GridActionsCellItem
            icon={<VisibilityIcon sx={{ color: "#42A5F5" }} />}
            label="Ver detalles"
            onClick={() => handleClickOpen(params.id)}
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
      field: "cliente_distribuidor",
      headerName: "Cliente / Distribuidor",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
      minWidth: 220,
      sortable: false,
      filterable: false,
      valueGetter: (value, row) => {
        const vr = row.visit_report;
        if (!vr) return "";
        if (vr.visit_type === "cliente_directo") {
          return `Cliente Directo - ${vr.client_visit?.razon_social ?? ""}`;
        }
        if (vr.visit_type === "distribuidor") {
          return `${vr.distributor_visit?.distribuidor ?? ""} - ${vr.distributor_visit?.grupo ?? ""} - ${vr.distributor_visit?.plaza ?? ""}`;
        }
        return "";
      },
      renderCell: (params) => {
        const vr = params.row.visit_report;
        if (!vr) return "-";

        if (vr.visit_type === "cliente_directo") {
          return (
            <Box sx={{ lineHeight: 1.3 }}>
              <Typography variant="body2" fontWeight={600}>
                Cliente Directo
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {vr.client_visit?.razon_social}
              </Typography>
            </Box>
          );
        }

        if (vr.visit_type === "distribuidor") {
          return (
            <Box sx={{ lineHeight: 1.3 }}>
              <Typography variant="body2" fontWeight={600}>
                {vr.distributor_visit?.distribuidor}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {vr.distributor_visit?.grupo} · {vr.distributor_visit?.plaza}
              </Typography>
            </Box>
          );
        }

        return "-";
      },
    },
    {
      field: "regional",
      headerName: "Regional",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      valueGetter: (value, row) => row.visit_report?.user?.name ?? "",
    },
    {
      field: "acuerdo",
      headerName: "Acuerdo",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "responsable",
      headerName: "Responsable",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "seguimiento",
      headerName: "Seguimiento",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      type: "singleSelect",
      valueOptions: [
        { value: 0, label: "Vencido" },
        { value: 1, label: "Pendiente" },
        { value: 2, label: "Completado" },
      ],
      renderCell: (params) => <StatusChip estado={params.value} />,
    },
    {
      field: "fecha_compromiso",
      headerName: "Fecha de compromiso",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params) => dateFormatter(params.value),
    },
    {
      field: "completado_at",
      headerName: "Fecha de completado",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.status !== 2 || !params.value) {
          return "-";
        }
        return dateFormatter(params.value);
      },
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
          Lista de acuerdos y actividades
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
      <ModalDetalleAcuerdos
        open={openModal}
        handleClose={handleClose}
        acuerdo={acuerdo}
      />
    </>
  );
}
