import React, { useContext, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AcuerdosContext from "../../Context/Acuerdos/AcuerdosContext";
import TableAcuerdos from "../../Components/Tables/TableAcuerdos";

const Acuerdos = () => {
  const { acuerdos, GetAcuerdos } = useContext(AcuerdosContext);

  useEffect(() => {
    GetAcuerdos();
  }, []);

  return (
    <Layout>
      <TableAcuerdos rows={acuerdos} />
    </Layout>
  );
};

export default Acuerdos;
