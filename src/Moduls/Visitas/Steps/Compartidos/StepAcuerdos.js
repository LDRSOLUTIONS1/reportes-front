import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

import AcuerdosField from "../../../../Components/Forms/AcuerdosField";
import VisitasContext from "../../../../Context/Visitas/VisitasContext";

const StepAcuerdos = () => {
  const { CompleteAgreement, CancelAgreement } = useContext(VisitasContext);

  const { getValues, setValue } = useFormContext();

  const handleComplete = async (index, updateRow) => {
    const agreement = getValues(`followup_agreements.${index}`);

    // Los acuerdos nuevos todavía no tienen ID en la BD
    if (!agreement?.id) {
      return;
    }

    try {
      const response = await CompleteAgreement(agreement.id);
      if (!response) return; 
      const completedAgreement = response.data;

      // update() sincroniza el array `fields` de useFieldArray,
      // por eso el re-render es inmediato (a diferencia de setValue)
      updateRow(index, {
        ...agreement,
        status: completedAgreement.status,
        completado_at: completedAgreement.completado_at,
      });
    } catch (error) {
      console.error("Error al completar el acuerdo:", error);
    }
  };

  const handleCancel = async (index, updateRow, motivo) => {
    const agreement = getValues(`followup_agreements.${index}`);
    if (!agreement?.id) return;

    try {
      const response = await CancelAgreement(agreement.id, motivo);
      const cancelledAgreement = response.data;

      updateRow(index, {
        ...agreement,
        status: cancelledAgreement.status,
        motivo_cancelacion: cancelledAgreement.motivo_cancelacion,
      });
    } catch (error) {
      console.error("Error al cancelar el acuerdo:", error);
    }
  };

  return (
    <AcuerdosField
      name="followup_agreements"
      addLabel="Agregar acuerdo"
      minRows={0}
      maxRows={25}
      onComplete={handleComplete}
      onCancel={handleCancel}
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
          lockWhenSaved: true,
          rules: {
            required: "Requerido",
          },
        },
      ]}
    />
  );
};

export default StepAcuerdos;
