import React from "react";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const StepAcuerdos = () => (
  <RepeaterField
    name="followup_agreements"
    addLabel="Agregar acuerdo"
    minRows={0}
    maxRows={25}
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
        name: "fecha_compromiso",
        label: "Fecha de compromiso",
        type: "date",
        rules: { required: "Requerido" },
      },
    ]}
  />
);

export default StepAcuerdos;
