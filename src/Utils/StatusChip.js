import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const estadoConfig = {
  0: { label: "Vencido", color: "error" },
  1: { label: "Pendiente", color: "warning" },
  2: { label: "Completado", color: "success" },
};

export const StatusChip = ({ estado }) => {
  const config = estadoConfig[estado] || {
    label: "Desconocido",
    color: "default",
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      icon={estado === 2 ? <CheckCircleIcon /> : <CancelIcon />}
      variant="outlined"
    />
  );
};
