import React from "react";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const StepAcuerdos = () => (
  <RepeaterField
    name="Acuerdos"
    addLabel="Agregar acuerdo"
    minRows={0}
    maxRows={3}
    columns={[
      {
        name: "acuerdo",
        label: "Acuerdo",
        type: "text",
        rules: { required: "Requerido" },
      },
      {
        name: "responsable",
        label: "Responsable",
        type: "text",
        rules: { required: "Requerido" },
      },
      {
        name: "fecha compromiso",
        label: "Fecha de compromiso",
        type: "date",
        rules: { required: "Requerido" },
      },
    ]}
  />
);

export default StepAcuerdos;
