import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Typography,
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

  // si cambia visit_type y el paso activo ya no existe en la nueva rama, regresa al inicio
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

  const guardar = (data) => onSubmit(data);

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
            disabled={activeStep === 0}
            onClick={backStep}
          >
            Atrás
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={methods.handleSubmit(guardar)}>
              {mode === "edit" ? "Actualizar" : "Guardar"}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={nextStep}
              disabled={activeStep === 0 && !visitType}
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
