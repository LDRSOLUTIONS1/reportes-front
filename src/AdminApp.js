import React from "react";
import AppRouter from "./Routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import RolesState from "./Context/Roles/RolesState";
import UsuariosState from "./Context/Usuarios/UsuariosState";
import ModulosState from "./Context/Modulos/ModulosState";

const AdminApp = () => {
  return (
    <AuthState>
      <RolesState>
        <UsuariosState>
          <ModulosState>
            <AppRouter />
          </ModulosState>
        </UsuariosState>
      </RolesState>
    </AuthState>
  );
};

export default AdminApp;
