import StepClienteDatos from "./ClienteDirecto/StepClienteDatos";
import StepContactos from "./ClienteDirecto/StepContactos";
import StepFlota from "./ClienteDirecto/StepFlota";
import StepHistorialEventos from "./ClienteDirecto/StepHistorialEventos";
import StepRequerimientos from "./ClienteDirecto/StepRequerimientos";
import StepAcuerdos from "./Compartidos/StepAcuerdos";
import StepCapacitacion from "./Compartidos/StepCapacitacion";
import StepEvidencias from "./Compartidos/StepEvidencias";

const ClienteDirectoSteps = [
  {
    label: "Datos del Cliente",
    component: StepClienteDatos,
    fields: [
      "razon_social",
      "ubicaciones",
      "tamanio_flota",
      "giro",
      "cobertura",
      "tipo_cliente",
    ],
  },
  { label: "Contactos", component: StepContactos, fields: [] },
  { label: "Flota", component: StepFlota, fields: [] },
  { label: "Historial y Eventos", component: StepHistorialEventos, fields: [] },
  {
    label: "Requerimientos",
    component: StepRequerimientos,
    fields: [
      "modelo_interes",
      "tipo_carroceria",
      "financiamiento",
      "tiempo_entrega",
      "lugar_entrega",
    ],
  },
  { label: "Acuerdos", component: StepAcuerdos, fields: [] },
  { label: "Capacitación", component: StepCapacitacion, fields: [] },
  { label: "Evidencias", component: StepEvidencias, fields: [] },
];

export default ClienteDirectoSteps;
