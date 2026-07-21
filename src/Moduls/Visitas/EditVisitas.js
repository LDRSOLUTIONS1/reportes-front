import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import VisitaStepper from "./Steps/VisitaStepper";
import MethodGet from "../../Config/Service";
import VisitasContext from "../../Context/Visitas/VisitasContext";

export default function EditVisitas() {
  const { id } = useParams();
  const [visita, setVisita] = useState(null);
  const { EditVisitas } = useContext(VisitasContext);

  useEffect(() => {
    if (!id) return;
    MethodGet(`/editarVisita/${id}`)
      .then((res) => {
        setVisita(res.data);
      })
      .catch(console.log);
  }, [id]);

  return (
    <Layout>
      <VisitaStepper
        mode="edit"
        defaultValues={visita}
        onSubmit={EditVisitas}
      />
    </Layout>
  );
}
