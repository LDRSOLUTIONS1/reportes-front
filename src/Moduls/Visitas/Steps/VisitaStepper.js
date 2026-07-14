import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

import StepInformacionGeneral from "./StepInformacionGeneral";
import StepInformacionComercial from "./StepInformacionComercial";
import StepCapacitacion from "./StepCapacitacion";
import StepResultados from "./StepResultados";
import StepEvidencias from "./StepEvidencias";

const steps = [
  "Información General",
  "Información Comercial",
  "Capacitación",
  "Resultados",
  "Evidencias",
];

const VisitaStepper = ({ onSubmit, defaultValues, mode = "create" }) => {
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const [activeStep, setActiveStep] = useState(0);

 useEffect(() => {
  if (defaultValues) {
    methods.reset(defaultValues);
  }
}, [defaultValues, methods]);

  const nextStep = async () => {
    let fields = [];

    switch (activeStep) {
      case 0:
        fields = [
          "visit_type",
          "tipo_visita",
          "objetivo",
          "logros_estrategia",
          "segmento",
          "fecha_inicio",
          "fecha_fin",
        ];
        break;

      case 1:
        fields = [];
        break;

      case 2:
        fields = [];
        break;

      case 3:
        fields = [];
        break;

      default:
        break;
    }

    const valid = await methods.trigger(fields);

    if (!valid) return;

    setActiveStep((prev) => prev + 1);
  };

  const backStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const guardar = (data) => {
    onSubmit(data);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <StepInformacionGeneral />;

      case 1:
        return <StepInformacionComercial />;

      case 2:
        return <StepCapacitacion />;

      case 3:
        return <StepResultados />;

      case 4:
        return <StepEvidencias />;

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mb={4}>{renderStep()}</Box>

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
            <Button variant="contained" onClick={nextStep}>
              Siguiente
            </Button>
          )}
        </Box>
      </Paper>
    </FormProvider>
  );
};

export default VisitaStepper;
