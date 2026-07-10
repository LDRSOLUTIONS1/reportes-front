import React from "react";
import AppRouter from "./Routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import RolesState from "./Context/Roles/RolesState";
import UsuariosState from "./Context/Usuarios/UsuariosState";
import ModulosState from "./Context/Modulos/ModulosState";
import VisitasState from "./Context/Visitas/VisitasState";

const AdminApp = () => {
  return (
    <AuthState>
      <RolesState>
        <UsuariosState>
          <ModulosState>
            <VisitasState>
              <AppRouter />
            </VisitasState>
          </ModulosState>
        </UsuariosState>
      </RolesState>
    </AuthState>
  );
};

export default AdminApp;
