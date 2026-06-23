import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost } from "../../Config/Service";
import tokenAuth from "../../Config/TokenAuth";
import Swal from "sweetalert2";

import { GET_USER, LOGIN_SUCCESS, LOGIN_ERROR } from "../../Types/Index";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: false,
    user: {},
    loading: true,
    success: false,
    errorAuth: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const AuthenticatedUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    MethodGet("/user")
      .then(({ data }) => {
        //localStorage.setItem("rolid", data.user.rolid);
        //localStorage.setItem("idusuario", data.user.idusuario);
        dispatch({
          type: GET_USER,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_ERROR,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        success: state.success,
        loading: state.loading,
        errorAuth: state.errorAuth,
        AuthenticatedUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;