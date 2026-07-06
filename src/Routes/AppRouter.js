import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import AuthContext from "../Context/Auth/AuthContext";
import LoadingComponent from "../Components/Loading/LoadingComponent";
import SuperAdminRoutes from "./SuperAdminRoutes";

const AppRouter = () => {
  const { authenticated, AuthenticatedUser, loading, loginExterno, errorAuth } =
    useContext(AuthContext);

  const location = window.location;
  const params = new URLSearchParams(location.search);
  const collaborator_number = params.get("collaborator_number");
  const [showLoader, setShowLoader] = React.useState(true);

  useEffect(() => {
    if (collaborator_number) {
      loginExterno(collaborator_number);
    } else {
      AuthenticatedUser();
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setShowLoader(false), 800);
    }
  }, [loading]);

  if (showLoader) {
    return <LoadingComponent loading={loading} />;
  }

  // if (!authenticated && errorAuth) {
  //   window.location.href = "https://ldrhsys.ldrhumanresources.com/";
  //   return null;
  // }

  const role_id = localStorage.getItem("role_id");
  let PrivateComponent = null;
  if (role_id === "1" || role_id === "2") PrivateComponent = SuperAdminRoutes;

  return (
    <Router>
      <Routes>
        {authenticated && PrivateComponent && (
          <Route path="/" element={<Navigate to="/Inicio" replace />} />
        )}

        {PrivateComponent && (
          <Route
            path="/*"
            element={
              <PrivateRouter
                component={PrivateComponent}
                isAuthenticated={authenticated}
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
