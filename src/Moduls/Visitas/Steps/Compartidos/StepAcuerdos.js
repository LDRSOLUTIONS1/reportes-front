import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

import AcuerdosField from "../../../../Components/Forms/AcuerdosField";
import VisitasContext from "../../../../Context/Visitas/VisitasContext";

const StepAcuerdos = () => {
  const { CompleteAgreement } = useContext(VisitasContext);

  const { getValues, setValue } = useFormContext();

  const handleComplete = async (index) => {
    const agreement = getValues(`followup_agreements.${index}`);

    // Los acuerdos nuevos todavía no tienen ID en la BD
    if (!agreement?.id) {
      return;
    }

    try {
      const response = await CompleteAgreement(agreement.id);

      const completedAgreement = response.data;

      // Actualizamos el estado en React Hook Form
      setValue(
        `followup_agreements.${index}.status`,
        completedAgreement.status,
        {
          shouldDirty: false,
        },
      );

      setValue(
        `followup_agreements.${index}.completado_at`,
        completedAgreement.completado_at,
        {
          shouldDirty: false,
        },
      );
    } catch (error) {
      console.error("Error al completar el acuerdo:", error);
    }
  };

  return (
    <AcuerdosField
      name="followup_agreements"
      addLabel="Agregar acuerdo"
      minRows={0}
      maxRows={25}
      onComplete={ handleComplete}
      columns={[
        {
          name: "acuerdo",
          label: "Acuerdo",
          type: "text",
          rules: {
            required: "Requerido",
          },
        },
        {
          name: "responsable",
          label: "Responsable",
          type: "text",
          rules: {
            required: "Requerido",
          },
        },
        {
          name: "seguimiento",
          label: "Seguimiento",
          type: "text",
          rules: {
            required: "Requerido",
          },
        },
        {
          name: "fecha_compromiso",
          label: "Fecha de compromiso",
          type: "date",
          rules: {
            required: "Requerido",
          },
        },
      ]}
    />
  );
};

export default StepAcuerdos;
