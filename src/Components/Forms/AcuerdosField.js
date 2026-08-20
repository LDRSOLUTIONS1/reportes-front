import React from "react";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Typography,
  Paper,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CancelIcon from "@mui/icons-material/Cancel";
import SelectField from "./Select";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

export default function AcuerdosField({
  name,
  columns = [],
  addLabel = "Agregar",
  emptyMessage = "Sin registros aún",
  minRows = 0,
  maxRows,
  mode = "create",
  onComplete,
  onCancel,
  onReschedule,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
    keyName: "_fieldId",
  });

  const handleAdd = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.name] = "";
      return acc;
    }, {});

    append(newRow);
  };

  const canRemove = mode !== "edit" && fields.length > minRows;
  const canAdd = !maxRows || fields.length < maxRows;

  const rowErrors = errors?.[name];

  const handleRemove = async (index) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar este acuerdo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    remove(index);

    await Swal.fire({
      title: "¡Eliminado!",
      text: "El acuerdo se eliminó correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const handleCancel = async (index) => {
    const { value: motivo } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cancelar este acuerdo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, regresar",
      reverseButtons: true,
      input: "text",
      inputLabel: "Motivo de cancelación",
      inputPlaceholder: "Escribe el motivo...",
      inputValidator: (value) => {
        if (!value?.trim()) {
          return "El motivo es requerido";
        }
      },
    });

    if (!motivo) return;

    onCancel?.(index, update, motivo);
  };

  const handleReschedule = async (index) => {
    const { value: formValues } = await Swal.fire({
      title: "¿Reprogramar fecha compromiso?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, reprogramar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
      html:
        '<input id="swal-fecha" type="date" class="swal2-input" placeholder="Nueva fecha compromiso">' +
        '<textarea id="swal-motivo" class="swal2-textarea" placeholder="Motivo de la reprogramación"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        const fecha_compromiso = document.getElementById("swal-fecha").value;
        const motivo_reprogramacion =
          document.getElementById("swal-motivo").value;

        if (!fecha_compromiso) {
          Swal.showValidationMessage("La nueva fecha es requerida");
          return false;
        }
        if (!motivo_reprogramacion?.trim()) {
          Swal.showValidationMessage("El motivo es requerido");
          return false;
        }
        return { fecha_compromiso, motivo_reprogramacion };
      },
    });

    if (!formValues) return;

    onReschedule?.(index, update, formValues);
  };

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={100}>Acciones</TableCell>

              {columns.map((col) => (
                <TableCell key={col.name}>{col.label}</TableCell>
              ))}

              <TableCell width={130}>Fecha vigente</TableCell>

              <TableCell width={130}>Estado</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fields.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 2}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {fields.map((field, index) => (
              <React.Fragment key={field._fieldId}>
                <TableRow>
                  {/* ACCIONES */}
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={0.5}
                    >
                      {/* COMPLETAR */}
                      {field.status !== 2 && field.status !== 3 && (
                        <IconButton
                          size="small"
                          color="success"
                          disabled={!field.id}
                          onClick={() => onComplete?.(index, update)}
                          title={
                            field.id
                              ? "Marcar como completado"
                              : "Guarda primero el acuerdo"
                          }
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      )}

                      {/* REPROGRAMAR */}
                      {field.status !== 2 && field.status !== 3 && (
                        <IconButton
                          size="small"
                          color="info"
                          disabled={!field.id}
                          onClick={() => handleReschedule(index)}
                          title={
                            field.id
                              ? "Reprogramar fecha compromiso"
                              : "Guarda primero el acuerdo"
                          }
                        >
                          <EventRepeatIcon fontSize="small" />
                        </IconButton>
                      )}

                      {/* CANCELAR */}
                      {field.status !== 2 && field.status !== 3 && (
                        <IconButton
                          size="small"
                          color="warning"
                          disabled={!field.id}
                          onClick={() => handleCancel(index)}
                          title={
                            field.id
                              ? "Cancelar acuerdo"
                              : "Guarda primero el acuerdo"
                          }
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      )}

                      {/* ELIMINAR */}
                      {mode !== "edit" && (
                        <IconButton
                          size="small"
                          color="error"
                          disabled={!canRemove}
                          onClick={() => handleRemove(index)}
                          title="Eliminar"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>

                  {columns.map((col) => {
                    const fieldName = `${name}.${index}.${col.name}`;
                    const fieldError = rowErrors?.[index]?.[col.name];

                    if (col.type === "select") {
                      return (
                        <TableCell key={col.name} sx={{ minWidth: 160 }}>
                          <SelectField
                            name={fieldName}
                            label=""
                            control={control}
                            rules={col.rules}
                            errors={{}}
                            options={col.options || []}
                            optionValue={col.optionValue || "id"}
                            getOptionLabel={col.getOptionLabel}
                            defaultOption={col.defaultOption}
                          />
                        </TableCell>
                      );
                    }

                    if (col.type === "textarea") {
                      return (
                        <TableCell key={col.name} sx={{ minWidth: 260 }}>
                          <Controller
                            name={fieldName}
                            control={control}
                            defaultValue=""
                            rules={col.rules}
                            render={({ field: controllerField }) => (
                              <TextField
                                {...controllerField}
                                fullWidth
                                multiline
                                minRows={2}
                                size="small"
                                error={!!fieldError}
                                helperText={fieldError?.message}
                              />
                            )}
                          />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={col.name} sx={{ minWidth: 140 }}>
                        <Controller
                          name={fieldName}
                          control={control}
                          defaultValue=""
                          rules={col.rules}
                          render={({ field: controllerField }) => (
                            <TextField
                              {...controllerField}
                              fullWidth
                              size="small"
                              type={
                                col.type === "date"
                                  ? "date"
                                  : col.type === "number"
                                    ? "number"
                                    : "text"
                              }
                              disabled={col.lockWhenSaved && !!field.id}
                              InputLabelProps={
                                col.type === "date"
                                  ? { shrink: true }
                                  : undefined
                              }
                              error={!!fieldError}
                              helperText={fieldError?.message}
                            />
                          )}
                        />
                      </TableCell>
                    );
                  })}

                  <TableCell>
                    {field.fecha_vigente ? (
                      <Typography variant="body2">
                        {field.fecha_vigente}
                        {field.numero_reprogramaciones > 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            Reprogramado {field.numero_reprogramaciones}{" "}
                            {field.numero_reprogramaciones === 1
                              ? "vez"
                              : "veces"}
                          </Typography>
                        )}
                      </Typography>
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  {/* ESTADO */}
                  <TableCell>
                    {field.status === 2 ? (
                      <Chip
                        label="Completado"
                        color="success"
                        size="small"
                        icon={<CheckCircleIcon />}
                      />
                    ) : field.status === 3 ? (
                      <Tooltip
                        title={
                          field.motivo_cancelacion || "Sin motivo especificado"
                        }
                        arrow
                      >
                        <Chip
                          label="Cancelado"
                          color="default"
                          size="small"
                          icon={<CancelIcon />}
                        />
                      </Tooltip>
                    ) : field.esta_vencido === true ? (
                      <Chip
                        label="Vencido"
                        color="error"
                        size="small"
                        icon={<ErrorOutlineIcon />}
                      />
                    ) : (
                      <Chip
                        label="Pendiente"
                        color="warning"
                        size="small"
                        icon={<PriorityHighIcon />}
                      />
                    )}
                  </TableCell>
                </TableRow>

                {field.status === 3 && field.motivo_cancelacion && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 2}
                      sx={{ py: 1, backgroundColor: "action.hover" }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        <strong>Motivo de cancelación:</strong>{" "}
                        {field.motivo_cancelacion}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        startIcon={<AddIcon />}
        onClick={handleAdd}
        disabled={!canAdd}
        sx={{ mt: 1 }}
      >
        {addLabel}
      </Button>
    </Box>
  );
}
