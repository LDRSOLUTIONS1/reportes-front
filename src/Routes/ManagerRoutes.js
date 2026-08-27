import React from "react";
import { Routes, Route } from "react-router-dom";

import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Visitas from "../Moduls/Visitas/Visitas";
import DetalleVisitas from "../Moduls/Visitas/DetalleVisitas";
import AddVisitas from "../Moduls/Visitas/AddVisitas";
import EditVisitas from "../Moduls/Visitas/EditVisitas";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Visitas" element={<Visitas />} />
      <Route path="/NuevaVisita" element={<AddVisitas />} />
      <Route path="/EditarVisita/:id" element={<EditVisitas />} />
      <Route path="/DetalleVisita/:id" element={<DetalleVisitas />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default ManagerRoutes;
