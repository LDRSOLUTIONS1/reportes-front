import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

import AcuerdosField from "../../../../Components/Forms/AcuerdosField";
import VisitasContext from "../../../../Context/Visitas/VisitasContext";

const StepAcuerdos = ({ mode }) => {
  const { CompleteAgreement, CancelAgreement, RescheduleAgreement } =
    useContext(VisitasContext);

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

  const handleReschedule = async (
    index,
    updateRow,
    { fecha_compromiso, motivo_reprogramacion },
  ) => {
    const agreement = getValues(`followup_agreements.${index}`);

    if (!agreement?.id) return;

    try {
      const response = await RescheduleAgreement(agreement.id, {
        fecha_compromiso,
        motivo_reprogramacion,
      });

      const updated = response.data;

      updateRow(index, {
        ...agreement,
        ...updated,

        // La fecha original siempre permanece
        fecha_compromiso: agreement.fecha_compromiso,

        fecha_vigente: (
          updated.fecha_vigente ??
          updated.fecha_compromiso ??
          fecha_compromiso
        ).substring(0, 10),

        dates: updated.dates ?? agreement.dates,

        esta_vencido: updated.esta_vencido ?? false,
      });
    } catch (error) {
      console.error("Error al reprogramar el acuerdo:", error);
    }
  };

  return (
    <AcuerdosField
      name="followup_agreements"
      mode={mode}
      addLabel="Agregar acuerdo"
      minRows={0}
      maxRows={25}
      onComplete={handleComplete}
      onCancel={handleCancel}
      onReschedule={handleReschedule}
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
