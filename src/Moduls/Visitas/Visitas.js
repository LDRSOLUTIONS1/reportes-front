import React, { useContext, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import VisitasContext from "../../Context/Visitas/VisitasContext";
import TableVisitas from "../../Components/Tables/TableVisitas";

const Visitas = () => {
  const { visitas, GetVisitas } = useContext(VisitasContext);

  useEffect(() => {
    GetVisitas();
  }, []);

  return (
    <Layout>
      <TableVisitas rows={visitas} />
    </Layout>
  );
};

export default Visitas;
