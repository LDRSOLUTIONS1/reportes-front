import React, { useReducer } from "react";
import VisitasContext from "./VisitasContext";
import VisitasReducer from "./VisitasReducer";
import MethodGet, { MethodPost, MethodPut } from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_VISITAS,
  ADD_VISITAS,
  SHOW_VISITAS,
  EDIT_VISITAS,
} from "../../Types/Index";
import imageHeaders from "../../Config/ImageHeaders";

const VisitasState = ({ children }) => {
  const initialState = {
    visitas: [],
    visita: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(VisitasReducer, initialState);

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

  const GetVisitas = () => {
    MethodGet("/visitas")
      .then((res) => {
        dispatch({
          type: GET_VISITAS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetVisita = (id) => {
    MethodGet(`/visitas/${id}`)
      .then((res) => {
        dispatch({
          type: SHOW_VISITAS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateVisitas = (data) => {
    MethodPost("/visitas", data, imageHeaders)
      .then((res) => {
        dispatch({ type: ADD_VISITAS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Visita creada correctamente",
          icon: "success",
        }).then(() => (window.location.href = "/visitas"));
        GetVisitas();
      })
      .catch(handleError);
  };

  const EditVisitas = (id, data) => {
    const request =
      data instanceof FormData
        ? MethodPost(`/editVisit/${id}?_method=PUT`, data, imageHeaders)
        : MethodPut(`/editVisit/${id}`, data);

    request
      .then((res) => {
        dispatch({ type: EDIT_VISITAS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Visita actualizada correctamente",
          icon: "success",
        }).then(() => (window.location.href = "/visitas"));
        GetVisitas();
      })
      .catch(handleError);
  };

  const CompleteAgreement = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas marcar este acuerdo como completado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, completar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return null;
    }

    try {
      const res = await MethodPost(`/followup-agreements/${id}/complete`);

      await Swal.fire({
        title: "¡Completado!",
        text: "El acuerdo se marcó como completado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      GetVisitas();

      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const CancelAgreement = async (id, motivo) => {
    try {
      const res = await MethodPost(`/followup-agreements/${id}/cancel`, {
        motivo_cancelacion: motivo,
      });

      await Swal.fire({
        title: "¡Cancelado!",
        text: "El acuerdo se canceló correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      GetVisitas();

      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  return (
    <VisitasContext.Provider
      value={{
        visitas: state.visitas,
        visita: state.visita,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetVisitas,
        GetVisita,
        CreateVisitas,
        EditVisitas,
        CompleteAgreement,
        CancelAgreement,
      }}
    >
      {children}
    </VisitasContext.Provider>
  );
};

export default VisitasState;
