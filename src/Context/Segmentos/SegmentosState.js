import React, { useReducer } from "react";
import SegmentosContext from "./SegmentosContext";
import SefmentosReducer from "./SefmentosReducer";
import MethodGet, { MethodPost, MethodPut } from "../../Config/Service";
import Swal from "sweetalert2";
import {
  GET_SEGMENTOS,
  ADD_SEGMENTOS,
  SHOW_SEGMENTOS,
  EDIT_SEGMENTOS,
} from "../../Types/Index";
import imageHeaders from "../../Config/ImageHeaders";

const SegmentosState = ({ children }) => {
  const initialState = {
    segmentos: [],
    segmento: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(SefmentosReducer, initialState);

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

  const GetSegmentos = () => {
    MethodGet("/segmentos")
      .then((res) => {
        dispatch({
          type: GET_SEGMENTOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const GetSegmento = (id) => {
    MethodGet(`/segmentos/${id}`)
      .then((res) => {
        dispatch({
          type: SHOW_SEGMENTOS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const CreateSegmentos = (data) => {
    MethodPost("/segmentos", data, imageHeaders)
      .then((res) => {
        dispatch({ type: ADD_SEGMENTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Segmento creado correctamente",
          icon: "success",
        });
        GetSegmentos();
      })
      .catch(handleError);
  };

  const EditSegmentos = (data) => {
    MethodPut(`/segmentos/${data.id}`, data)
      .then((res) => {
        dispatch({ type: EDIT_SEGMENTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Segmento actualizado correctamente",
          icon: "success",
        });
        GetSegmentos();
      })
      .catch(handleError);
  };

  return (
    <SegmentosContext.Provider
      value={{
        segmentos: state.segmentos,
        segmento: state.segmento,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetSegmentos,
        GetSegmento,
        CreateSegmentos,
        EditSegmentos,
      }}
    >
      {children}
    </SegmentosContext.Provider>
  );
};

export default SegmentosState;
