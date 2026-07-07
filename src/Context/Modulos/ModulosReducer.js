import { GET_MODULOS, SHOW_MODULOS } from "../../Types/Index";

const ModulosReducer = (state, action) => {
  switch (action.type) {
    case GET_MODULOS:
      return {
        ...state,
        modulos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case SHOW_MODULOS:
      return {
        ...state,
        modulo: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default ModulosReducer;
