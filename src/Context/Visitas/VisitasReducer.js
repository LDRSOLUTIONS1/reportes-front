import { GET_VISITAS, SHOW_VISITAS } from "../../Types/Index";

const VisitasReducer = (state, action) => {
  switch (action.type) {
    case GET_VISITAS:
      return {
        ...state,
        visitas: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case SHOW_VISITAS:
      return {
        ...state,
        visita: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default VisitasReducer;
