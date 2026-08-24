import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

import StepInformacionGeneral from "./StepInformacionGeneral";
import ClienteDirectoSteps from "./ClienteDirectoSteps";
import DistribuidorSteps from "./DistribuidorSteps";

const stepInformacionGeneral = {
  label: "Información General",
  component: StepInformacionGeneral,
  fields: [
    "visit_type",
    "tipo_visita",
    "objetivo",
    "logros_estrategia",
    "segmento",
    "fecha_inicio",
    "fecha_fin",
  ],
};

const VisitaStepper = ({ onSubmit, defaultValues, mode = "create" }) => {
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visitType = methods.watch("visit_type");

  /*
   * Construye los steps dependiendo del tipo de visita
   */
  const steps = useMemo(() => {
    if (visitType === "cliente_directo") {
      return [stepInformacionGeneral, ...ClienteDirectoSteps];
    }

    if (visitType === "distribuidor") {
      return [stepInformacionGeneral, ...DistribuidorSteps];
    }

    return [stepInformacionGeneral];
  }, [visitType]);

  /*
   * Cargar los valores cuando estamos editando
   */
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  /*
   * Si cambia el tipo de visita y el step actual
   * ya no existe, regresar al primer step.
   */
  useEffect(() => {
    if (activeStep > steps.length - 1) {
      setActiveStep(0);
    }
  }, [steps, activeStep]);

  /*
   * Avanzar al siguiente step.
   * Aquí sí se mantiene la validación.
   */
  const nextStep = async () => {
    const { fields } = steps[activeStep];

    const valid = await methods.trigger(fields);

    if (!valid) return;

    setActiveStep((prev) => prev + 1);
  };

  /*
   * Regresar al step anterior.
   */
  const backStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  /*
   * Ir directamente a un step.
   *
   * En edición se permite hacer clic en cualquier apartado.
   * En creación se mantiene el flujo normal.
   */
  const goToStep = (index) => {
    if (mode === "edit") {
      setActiveStep(index);
    }
  };

  /*
   * Guardar / actualizar la visita
   */
  const guardar = async (data) => {
    if (isSubmitting) return;

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      /*
       * Ignorar valores null o undefined
       */
      if (value === null || value === undefined) {
        return;
      }

      /*
       * Archivos individuales
       */
      if (value instanceof File) {
        formData.append(key, value);
        return;
      }

      /*
       * Evidencias
       */
      if (key === "evidencias") {
        value.forEach((item, index) => {
          /*
           * Archivo nuevo
           */
          if (item.file instanceof File) {
            formData.append(`evidencias[${index}]`, item.file);
          }

          /*
           * Evidencia existente
           */
          if (item.id) {
            formData.append("evidencias_existentes[]", item.id);
          }
        });

        return;
      }

      /*
       * Arrays / objetos
       */
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
        return;
      }

      /*
       * Valores simples
       */
      formData.append(key, value);
    });

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error al guardar la visita:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepComponent = steps[activeStep]?.component;

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: 4 }}>
        {/* STEPPER */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                onClick={() => goToStep(index)}
                sx={{
                  cursor: mode === "edit" ? "pointer" : "default",

                  "&:hover .MuiStepLabel-label": {
                    color: mode === "edit" ? "primary.main" : "inherit",
                  },
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* CONTENIDO DEL STEP */}
        <Box mb={4}>
          {StepComponent ? (
            <StepComponent mode={mode} />
          ) : (
            <Typography color="text.secondary">
              Selecciona el tipo de visita para continuar.
            </Typography>
          )}
        </Box>

        {/* BOTONES */}
        <Box display="flex" justifyContent="space-between">
          {/* ATRÁS */}
          <Button
            variant="outlined"
            disabled={activeStep === 0 || isSubmitting}
            onClick={backStep}
          >
            Atrás
          </Button>

          {/* ÚLTIMO STEP */}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={methods.handleSubmit(guardar)}
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : null
              }
            >
              {isSubmitting
                ? "Guardando..."
                : mode === "edit"
                  ? "Actualizar"
                  : "Guardar"}
            </Button>
          ) : (
            /* SIGUIENTE */
            <Button
              variant="contained"
              onClick={nextStep}
              disabled={(activeStep === 0 && !visitType) || isSubmitting}
            >
              Siguiente
            </Button>
          )}
        </Box>
      </Paper>
    </FormProvider>
  );
};

export default VisitaStepper;
