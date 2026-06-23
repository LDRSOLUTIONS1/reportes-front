import React from "react";
import AppRouter from "./Routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";

const AdminApp = () => {
  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  );
};

export default AdminApp;
