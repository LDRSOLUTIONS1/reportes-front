import React from "react";
import { Routes, Route } from "react-router-dom";

import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Usuarios from "../Moduls/Usuarios/Usuarios";
import Roles from "../Moduls/Roles/Roles";
import Modulos from "../Moduls/Modulos/Modulos";
import Visitas from "../Moduls/Visitas/Visitas";
import AddVisitas from "../Moduls/Visitas/AddVisitas";
import EditVisitas from "../Moduls/Visitas/EditVisitas";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Visitas" element={<Visitas />} />
      <Route path="/NuevaVisita" element={<AddVisitas />} />
      <Route path="/EditarVisita/:id" element={<EditVisitas />} />
      <Route path="/Usuarios" element={<Usuarios />} />
      <Route path="/Roles" element={<Roles />} />
      <Route path="/Modulos" element={<Modulos />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default SuperAdminRoutes;
