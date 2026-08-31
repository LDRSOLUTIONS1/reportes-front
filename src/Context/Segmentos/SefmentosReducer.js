import { GET_SEGMENTOS, SHOW_SEGMENTOS } from "../../Types/Index";

const SefmentosReducer = (state, action) => {
  switch (action.type) {
    case GET_SEGMENTOS:
      return {
        ...state,
        segmentos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case SHOW_SEGMENTOS:
      return {
        ...state,
        segmento: action.payload,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};

export default SefmentosReducer;
