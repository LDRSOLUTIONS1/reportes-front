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
import SelectField from "./Select";

export default function AcuerdosField({
  name,
  columns = [],
  addLabel = "Agregar",
  emptyMessage = "Sin registros aún",
  minRows = 0,
  maxRows,
  onComplete,
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

  const canRemove = fields.length > minRows;
  const canAdd = !maxRows || fields.length < maxRows;

  const rowErrors = errors?.[name];

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.name}>{col.label}</TableCell>
              ))}

              <TableCell width={130}>Estado</TableCell>

              <TableCell width={100}>Acciones</TableCell>
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
              <TableRow key={field._fieldId}>
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
                              col.type === "date" ? { shrink: true } : undefined
                            }
                            error={!!fieldError}
                            helperText={fieldError?.message}
                          />
                        )}
                      />
                    </TableCell>
                  );
                })}

                {/* ESTADO */}
                <TableCell>
                  {field.status === 2 ? (
                    <Chip
                      label="Completado"
                      color="success"
                      size="small"
                      icon={<CheckCircleIcon />}
                    />
                  ) : field.status === 0 ? (
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

                {/* ACCIONES */}
                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={0.5}
                  >
                    {/* COMPLETAR */}
                    {field.status !== 2 && (
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

                    {/* ELIMINAR */}
                    <IconButton
                      size="small"
                      color="error"
                      disabled={!canRemove}
                      onClick={() => remove(index)}
                      title="Eliminar"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
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
