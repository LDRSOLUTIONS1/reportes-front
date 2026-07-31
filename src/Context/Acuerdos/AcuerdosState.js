import React, { useReducer } from "react";
import AcuerdosContext from "./AcuerdosContext";
import AcuerdosReducer from "./AcuerdosReducer";
import MethodGet from "../../Config/Service";
import Swal from "sweetalert2";
import { GET_ACUERDOS, SHOW_ACUERDOS } from "../../Types/Index";

const AcuerdosState = ({ children }) => {
  const initialState = {
    acuerdos: [],
    acuerdo: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(AcuerdosReducer, initialState);

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

  const GetAcuerdos = () => {
    MethodGet("/acuerdos")
      .then((res) => {
        dispatch({
          type: GET_ACUERDOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetAcuerdo = (id) => {
    MethodGet(`/acuerdos/${id}`)
      .then((res) => {
        dispatch({
          type: SHOW_ACUERDOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  return (
    <AcuerdosContext.Provider
      value={{
        acuerdos: state.acuerdos,
        acuerdo: state.acuerdo,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetAcuerdos,
        GetAcuerdo,
      }}
    >
      {children}
    </AcuerdosContext.Provider>
  );
};

export default AcuerdosState;
