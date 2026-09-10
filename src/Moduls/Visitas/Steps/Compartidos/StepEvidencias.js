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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import TableChartIcon from "@mui/icons-material/TableChart";
import SlideshowIcon from "@mui/icons-material/Slideshow";

const MAX_FILES = 10;
const MAX_SIZE_MB = 10;

const getExtension = (filename = "") =>
  filename.split(".").pop()?.toLowerCase() || "";

const isImageFile = (filename = "", mimeType = "") => {
  if (mimeType && mimeType.startsWith("image/")) {
    return true;
  }

  const extension = getExtension(filename);

  return [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "bmp",
    "svg",
    "heic",
    "heif",
  ].includes(extension);
};

// Mapea extensión -> { icono, color, etiqueta }
const getFileTypeInfo = (filename = "") => {
  const extension = getExtension(filename);

  if (extension === "pdf") {
    return {
      icon: PictureAsPdfIcon,
      color: "#D32F2F",
      label: "PDF",
    };
  }

  if (["doc", "docx"].includes(extension)) {
    return {
      icon: DescriptionIcon,
      color: "#2B579A",
      label: "Word",
    };
  }

  if (["xls", "xlsx", "csv"].includes(extension)) {
    return {
      icon: TableChartIcon,
      color: "#217346",
      label: "Excel",
    };
  }

  if (["ppt", "pptx"].includes(extension)) {
    return {
      icon: SlideshowIcon,
      color: "#D24726",
      label: "PowerPoint",
    };
  }

  return {
    icon: InsertDriveFileIcon,
    color: "text.disabled",
    label: "Archivo",
  };
};

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

    const oversized = selected.find(
      (file) => file.size > MAX_SIZE_MB * 1024 * 1024,
    );
    if (oversized) {
      setError("evidencias", {
        type: "manual",
        message: `"${oversized.name}" supera ${MAX_SIZE_MB}MB`,
      });
      return;
    }

    selected.forEach((file) => {
      const image = isImageFile(file.name, file.type);

      append({
        file,
        filename: file.name,
        tipo: image ? "foto" : "anexo",

        preview: image ? URL.createObjectURL(file) : null,
      });
    });

    e.target.value = "";
  };

  const handleOpenFile = (field) => {
    if (field.file instanceof File) {
      const url = URL.createObjectURL(field.file);

      window.open(url, "_blank");

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000);

      return;
    }

    // Archivo existente
    if (field.preview) {
      window.open(field.preview, "_blank");
    }
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
          accept="
            image/*,
            .pdf,
            .doc,
            .docx,
            .xls,
            .xlsx,
            .csv,
            .ppt,
            .pptx
          "
          onChange={handleFiles}
        />
      </Button>

      {formState.errors?.evidencias && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {formState.errors.evidencias.message}
        </Typography>
      )}

      <Grid container spacing={2}>
        {fields.map((field, index) => {
          const isImage = isImageFile(field.filename, field.file?.type);
          const {
            icon: FileIcon,
            color,
            label,
          } = getFileTypeInfo(field.filename);

          return (
            <Grid
              key={field.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  position: "relative",
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  minHeight: 180,
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
                    zIndex: 2,

                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>

                {isImage && field.preview ? (
                  <Box
                    component="img"
                    src={field.preview}
                    alt={field.filename}
                    onClick={() => handleOpenFile(field)}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    sx={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 1,
                      display: "block",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease",

                      "&:hover": {
                        opacity: 0.85,
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.100",
                      borderRadius: 1,
                      gap: 1,
                    }}
                  >
                    <FileIcon sx={{ fontSize: 40, color }} />

                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                  </Box>
                )}

                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                  title={field.filename}
                >
                  {field.filename}
                </Typography>

                {!isImage && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<OpenInNewIcon />}
                    onClick={() => handleOpenFile(field)}
                    disabled={!field.preview && !field.file}
                  >
                    Abrir archivo
                  </Button>
                )}
              </Paper>
            </Grid>
          );
        })}
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
