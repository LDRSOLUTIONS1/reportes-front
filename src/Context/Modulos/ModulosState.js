import React, { useReducer } from "react";
import ModulosContext from "./ModulosContext";
import ModulosReducer from "./ModulosReducer";
import MethodGet, { MethodPost, MethodPut } from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_MODULOS,
  ADD_MODULOS,
  SHOW_MODULOS,
  EDIT_MODULOS,
} from "../../Types/Index";
import imageHeaders from "../../Config/ImageHeaders";

const ModulosState = ({ children }) => {
  const initialState = {
    modulos: [],
    modulo: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ModulosReducer, initialState);

  const handleError = (error) => {
    if (!error.response) {
      Swal.fire("Error", "Error de conexión con el servidor", "error");
      return;
    }
    const { status, data } = error.response;
    if (status === 422 && data.errors) {
      const mensajes = Object.entries(data.errors)
        .map(([campo, errores]) => `• ${errores.join(", ")}`)
        .join("\n");
      Swal.fire({
        title: "Error de validación",
        text: mensajes,
        icon: "warning",
      });
      return;
    }
    if (data.message) {
      Swal.fire("Error", data.message, "error");
      return;
    }
    Swal.fire("Error", "Ocurrió un error inesperado", "error");
  };

  const GetModulos = () => {
    MethodGet("/modulos")
      .then((res) => {
        dispatch({
          type: GET_MODULOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetModulo = (id) => {
    MethodGet(`/modulos/${id}`)
      .then((res) => {
        dispatch({
          type: SHOW_MODULOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateModulos = (data) => {
    MethodPost("/modulos", data, imageHeaders)
      .then((res) => {
        dispatch({ type: ADD_MODULOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Módulo creado correctamente",
          icon: "success",
        });
        GetModulos();
      })
      .catch(handleError);
  };

  const EditModulos = (data) => {
    MethodPut(`/modulos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: EDIT_MODULOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Módulo actualizado correctamente",
          icon: "success",
        });
        GetModulos();
      })
      .catch(handleError);
  };

  return (
    <ModulosContext.Provider
      value={{
        modulos: state.modulos,
        modulo: state.modulo,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetModulos,
        GetModulo,
        CreateModulos,
        EditModulos,
      }}
    >
      {children}
    </ModulosContext.Provider>
  );
};

export default ModulosState;
