import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import VisitaStepper from "./Steps/VisitaStepper";
import VisitasContext from "../../Context/Visitas/VisitasContext";

export default function AddVisitas() {
  const { CreateVisitas } = useContext(VisitasContext);

  return (
    <Layout>
      <VisitaStepper
        mode="create"
        defaultValues={{}}
        onSubmit={CreateVisitas}
      />
    </Layout>
  );
}