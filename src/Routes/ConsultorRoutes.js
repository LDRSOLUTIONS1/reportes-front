import React from "react";
import { Routes, Route } from "react-router-dom";

import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Visitas from "../Moduls/Visitas/Visitas";
import Acuerdos from "../Moduls/Acuerdos/Acuerdos";
import DetalleVisitas from "../Moduls/Visitas/DetalleVisitas";

const ConsultorRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Visitas" element={<Visitas />} />
      <Route path="/DetalleVisita/:id" element={<DetalleVisitas />} />
      <Route path="/Acuerdos" element={<Acuerdos />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default ConsultorRoutes;
