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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SelectField from "./Select";

/**
 * columns: [
 *   { name: "nombre", label: "Nombre", type: "text", rules: {...} },
 *   { name: "puesto", label: "Puesto", type: "text" },
 *   { name: "tipo", label: "Tipo", type: "select", options: [...], optionValue: "id" },
 *   { name: "fecha", label: "Fecha", type: "date" },
 *   { name: "cantidad", label: "Cantidad", type: "number" },
 * ]
 */
export default function RepeaterField({
  name,
  columns = [],
  addLabel = "Agregar",
  emptyMessage = "Sin registros aún",
  minRows = 0,
  maxRows,
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name });

  const defaultRow = columns.reduce((acc, col) => {
    acc[col.name] = "";
    return acc;
  }, {});

  const handleAdd = () => append(defaultRow);

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
              <TableCell width={48} />
            </TableRow>
          </TableHead>

          <TableBody>
            {fields.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
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
              <TableRow key={field.id}>
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

                <TableCell>
                  <IconButton
                    size="small"
                    color="error"
                    disabled={!canRemove}
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
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
