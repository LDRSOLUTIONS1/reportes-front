import React, { useContext, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import SegmentosContext from "../../Context/Segmentos/SegmentosContext";
import TableSegmentos from "../../Components/Tables/TableSegmentos";

const Segmentos = () => {
  const { segmentos, GetSegmentos } = useContext(SegmentosContext);

  useEffect(() => {
    GetSegmentos();
  }, []);

  return (
    <Layout>
      <TableSegmentos rows={segmentos} />
    </Layout>
  );
};

export default Segmentos;
