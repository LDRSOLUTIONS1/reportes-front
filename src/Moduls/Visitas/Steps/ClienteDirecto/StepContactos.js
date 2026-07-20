import React from "react";
import RepeaterField from "../../../../Components/Forms/RepeaterField";

const StepContactos = () => (
  <RepeaterField
    name="contactos"
    addLabel="Agregar contacto"
    minRows={0}
    maxRows={25}
    columns={[
      {
        name: "nombre",
        label: "Nombre",
        type: "text",
        rules: { required: "Requerido" },
      },
      {
        name: "puesto",
        label: "Puesto",
        type: "text",
        rules: { required: "Requerido" },
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        rules: {
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido" },
        },
      },
      {
        name: "telefono",
        label: "Teléfono",
        type: "text",
        rules: { required: "Requerido" },
      },
    ]}
  />
);

export default StepContactos;
