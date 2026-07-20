import StepDistribuidorAgenda from "./Distribuidor/StepDistribuidorAgenda";
import StepAcompanamiento from "./Distribuidor/StepAcompanamiento";
import StepIndicadores from "./Distribuidor/StepIndicadores";
import StepAcuerdos from "./Compartidos/StepAcuerdos";
import StepCapacitacion from "./Compartidos/StepCapacitacion";
import StepEvidencias from "./Compartidos/StepEvidencias";

const DistribuidorSteps = [
  {
    label: "Distribuidor y Agenda",
    component: StepDistribuidorAgenda,
    fields: ["distribuidor", "plaza", "grupo"],
  },
  { label: "Acompañamiento", component: StepAcompanamiento, fields: [] },
  { label: "Capacitación", component: StepCapacitacion, fields: [] },
  { label: "Acuerdos", component: StepAcuerdos, fields: [] },
  { label: "Indicadores Comerciales", component: StepIndicadores, fields: [] },
  { label: "Evidencias", component: StepEvidencias, fields: [] },
];

export default DistribuidorSteps;
