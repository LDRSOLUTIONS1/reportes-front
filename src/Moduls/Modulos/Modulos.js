
import React, { useContext, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ModulosContext from "../../Context/Modulos/ModulosContext";
import TableModulos from "../../Components/Tables/TableModulos";

const Modulos = () => {
  const { modulos, GetModulos } = useContext(ModulosContext);

  useEffect(() => {
    GetModulos();
  }, []);

  return (
    <Layout>
      <TableModulos rows={modulos} />
    </Layout>
  );
};

export default Modulos;
