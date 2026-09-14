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
      "rutas",
      "cobertura",
      "tipo_cliente",
      "edad_promedio_flota",
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
      "proyeccion_compra",
      "financiamiento",
      "tiempo_entrega",
      "lugar_entrega",
      "distribuidor",
      "demo",
    ],
  },
  { label: "Acuerdos y Actividades", component: StepAcuerdos, fields: [] },
  {
    label: "Capacitación",
    component: StepCapacitacion,
    fields: ["tipo", "tema_principal", "num_personas", "comentarios"],
  },
  { label: "Evidencias", component: StepEvidencias, fields: [] },
];

export default ClienteDirectoSteps;
