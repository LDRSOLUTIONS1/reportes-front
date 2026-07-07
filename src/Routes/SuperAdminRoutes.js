import React from "react";
import { Routes, Route } from "react-router-dom";

import NoResultados from "../Components/Layout/NoResultados";
import Inicio from "../Moduls/Inicio/Inicio";
import Usuarios from "../Moduls/Usuarios/Usuarios";
import Modulos from "../Moduls/Modulos/Modulos";
import Roles from "../Moduls/Roles/Roles";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Usuarios" element={<Usuarios />} />
      <Route path="/Modulos" element={<Modulos />} />
      <Route path="/Roles" element={<Roles />} />

      <Route path="/no-resultados" element={<NoResultados />} />
      <Route path="*" element={<NoResultados />} />
    </Routes>
  );
};

export default SuperAdminRoutes;
