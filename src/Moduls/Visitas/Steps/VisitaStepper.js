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
  const methods = useForm({ defaultValues, mode: "onChange" });
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visitType = methods.watch("visit_type");

  const steps = useMemo(() => {
    if (visitType === "cliente_directo")
      return [stepInformacionGeneral, ...ClienteDirectoSteps];
    if (visitType === "distribuidor")
      return [stepInformacionGeneral, ...DistribuidorSteps];
    return [stepInformacionGeneral];
  }, [visitType]);

  useEffect(() => {
    if (defaultValues) methods.reset(defaultValues);
  }, [defaultValues, methods]);

  useEffect(() => {
    if (activeStep > steps.length - 1) setActiveStep(0);
  }, [steps, activeStep]);

  const nextStep = async () => {
    const { fields } = steps[activeStep];
    const valid = await methods.trigger(fields);
    if (!valid) return;
    setActiveStep((prev) => prev + 1);
  };

  const backStep = () => setActiveStep((prev) => prev - 1);

  const guardar = async (data) => {
    if (isSubmitting) return;

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      if (value instanceof File) {
        formData.append(key, value);
        return;
      }

      if (key === "evidencias") {
        value.forEach((item, index) => {
          if (item.file instanceof File) {
            formData.append(`evidencias[${index}]`, item.file);
          }

          if (item.id) {
            formData.append(`evidencias_existentes[]`, item.id);
          }
        });

        return;
      }

      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
        return;
      }

      formData.append(key, value);
    });

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
      // El error se maneja aquí solo para asegurar que el loading se apague.
      // El manejo de UI del error (toast/alert) puede seguir viviendo en el context.
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepComponent = steps[activeStep]?.component;

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mb={4}>
          {StepComponent ? (
            <StepComponent />
          ) : (
            <Typography color="text.secondary">
              Selecciona el tipo de visita para continuar.
            </Typography>
          )}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            disabled={activeStep === 0 || isSubmitting}
            onClick={backStep}
          >
            Atrás
          </Button>

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
