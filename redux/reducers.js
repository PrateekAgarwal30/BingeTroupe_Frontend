import { combineReducers } from "redux";
import { GENERAL } from "./actions";
const initialState = {
  homeConfigErr: null,
  homeConfigLoading: false,
  homeConfig: null,
  detailPageContentErr: null,
  detailPageContentLoading: false,
  detailPageContent: null
};
const generalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL.GET_HOME_CONFIG_SENT:
      return { ...state, homeConfigErr: null, homeConfigLoading: true };
    case GENERAL.GET_HOME_CONFIG_FULFILLED:
      return {
        ...state,
        homeConfigErr: null,
        homeConfigLoading: false,
        homeConfig: action.payload
      };
    case GENERAL.GET_HOME_CONFIG_REJECTED:
      return {
        ...state,
        homeConfigLoading: false,
        homeConfigErr: action.payload
      };
    case GENERAL.GET_CONTENT_BY_ID_SENT:
      return {
        ...state,
        detailPageContentErr: null,
        detailPageContentLoading: true
      };
    case GENERAL.GET_CONTENT_BY_ID_FULFILLED:
      return {
        ...state,
        detailPageContentErr: null,
        detailPageContentLoading: false,
        detailPageContent: action.payload
      };
    case GENERAL.GET_CONTENT_BY_ID_REJECTED:
      return {
        ...state,
        detailPageContentLoading: false,
        detailPageContentErr: action.payload
      };
    case GENERAL.CLEAR_CONTENT_BY_ID:
      return {
        ...state,
        detailPageContentErr: null,
        detailPageContentLoading: false,
        detailPageContent: null
      };
    default:
      return { ...state };
  }
};

const profileDataReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

const reducer = combineReducers({
  general: generalDataReducer,
  profile: profileDataReducer
});
export default reducer;
