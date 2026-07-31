import { GET_ACUERDOS, SHOW_ACUERDOS } from "../../Types/Index";

const AcuerdosReducer = (state, action) => {
  switch (action.type) {
    case GET_ACUERDOS:
      return {
        ...state,
        acuerdos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case SHOW_ACUERDOS:
      return {
        ...state,
        acuerdo: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default AcuerdosReducer;
