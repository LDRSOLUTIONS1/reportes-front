import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRouter = ({
  isAuthenticated,
  children,
}) => {
  const lastPath = window.location.pathname;
  localStorage.setItem("lastPath", lastPath);

  return isAuthenticated
    ? children
    : <Navigate to="/" replace />;
};

PrivateRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRouter;