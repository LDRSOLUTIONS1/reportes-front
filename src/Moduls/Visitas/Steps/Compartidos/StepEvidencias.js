import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const MAX_FILES = 10;
const MAX_SIZE_MB = 10;

const StepEvidencias = () => {
  const { control, setError, clearErrors, formState } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "evidencias",
  });

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    clearErrors("evidencias");

    if (fields.length + selected.length > MAX_FILES) {
      setError("evidencias", {
        type: "manual",
        message: `Máximo ${MAX_FILES} archivos`,
      });
      return;
    }

    const oversized = selected.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversized) {
      setError("evidencias", {
        type: "manual",
        message: `"${oversized.name}" supera ${MAX_SIZE_MB}MB`,
      });
      return;
    }

    selected.forEach((file) => {
      const isImage = file.type.startsWith("image/");
      append({
        file,
        filename: file.name,
        tipo: isImage ? "imagen" : "archivo",
        preview: isImage ? URL.createObjectURL(file) : null,
      });
    });

    e.target.value = "";
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Fotos o anexos (Opcionales)
      </Typography>

      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 2 }}
      >
        Subir archivos
        <input
          type="file"
          hidden
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFiles}
        />
      </Button>

      {formState.errors?.evidencias && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {formState.errors.evidencias.message}
        </Typography>
      )}

      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid key={field.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                position: "relative",
                p: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={() => remove(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "background.paper",
                }}
              >
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>

              {field.preview ? (
                <Box
                  component="img"
                  src={field.preview}
                  alt={field.filename}
                  sx={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.100",
                    borderRadius: 1,
                  }}
                >
                  <InsertDriveFileIcon fontSize="large" color="disabled" />
                </Box>
              )}

              <Typography
                variant="caption"
                noWrap
                sx={{ width: "100%", textAlign: "center" }}
                title={field.filename}
              >
                {field.filename}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {fields.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No se han agregado archivos.
        </Typography>
      )}
    </Box>
  );
};

export default StepEvidencias;
