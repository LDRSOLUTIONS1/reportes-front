import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import RecoverPassword from "../Components/Auth/RecoverPassword";
import AdminRouter from "./AdminRouter";
import AuthContext from "../Context/Auth/AuthContext";
import { Grid } from "@mui/material";
import LoadingComponent from "../Components/Loading/LoadingComponent";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const AppRouter = () => {
  const { authenticated, AuthenticatedUser, loading, errorAuth } = useContext(AuthContext);

  useEffect(() => {
    AuthenticatedUser();
  }, []);

  if (loading) {
    return (
      <Grid size={{ xs: 12 }}>
        <LoadingComponent />
      </Grid>
    );
  }

  if (!AuthenticatedUser && errorAuth) {
    return <Navigate to="/" replace />;
  }

  const type_user = localStorage.getItem("type_user");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRouter isAuthenticated={authenticated}>
              <Login />
            </PublicRouter>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRouter isAuthenticated={authenticated}>
              <Register />
            </PublicRouter>
          }
        />

        <Route
          path="/recover-password"
          element={
            <PublicRouter isAuthenticated={authenticated}>
              <RecoverPassword />
            </PublicRouter>
          }
        />

        {type_user === "1" && (
          <Route
            path="/*"
            element={
              <PrivateRouter isAuthenticated={authenticated}>
                <AdminRouter />
              </PrivateRouter>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;