import React from "react";
import AppRouter from "./Routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import RolesState from "./Context/Roles/RolesState";

const AdminApp = () => {
  return (
    <AuthState>
      <RolesState>
        <AppRouter />
      </RolesState>
    </AuthState>
  );
};

export default AdminApp;
