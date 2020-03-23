import { combineReducers } from "redux";
import { LOGIN, REGISTER, USER, PROFILE } from "./actions";
const initialState = { err: null, isLoading: false };
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.LOGIN_SENT:
    case REGISTER.REGISTER_SENT:
      return {
        ...state,
        ...action.payload,
        err: null
      };
    case LOGIN.LOGIN_TEXT_CHANGE:
      return {
        ...state,
        err: null
      };
    case USER.GET_PROFILE_FULFILLED:
    case PROFILE.GET_TP_ADDRESSES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        tech_addresses: action.payload
      };
    case USER.GET_MEALS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        meals: action.payload
      };
    case USER.POST_CART_ITEMS_SENT:
      return {
        ...state,
        isCartLoading: true
      };
    case USER.POST_CART_ITEMS_FULFILLED:
      return {
        ...state,
        isCartLoading: false,
        cart: action.payload
      };
    case USER.POST_CART_ITEMS_REJECTED:
      return {
        ...state,
        isCartLoading: false
      };
    case USER.CLEAR_CART_ITEMS:
      return {
        ...state,
        isCartLoading: false,
        cart: null
      };
    case USER.GET_PROFILE_REJECTED:
    case PROFILE.GET_TP_ADDRESSES_SENT:
    case REGISTER.REGISTER_FULFILLED:
    case REGISTER.REGISTER_REJECTED:
    case USER.GET_PROFILE_SENT:
    case LOGIN.LOGIN_FULFILLED:
    case LOGIN.LOGIN_REJECTED:
    case PROFILE.GET_TP_ADDRESSES_REJECTED:
    case USER.CHANGE_PASS_SENT:
    case USER.CHANGE_PASS_REJECTED:
    case USER.CHANGE_PASS_FULFILLED:
    case PROFILE.UPDATE_PROFILE_SENT:
    case PROFILE.UPDATE_PROFILE_REJECTED:
    case PROFILE.UPDATE_PROFILE_FULFILLED:
    case PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_SENT:
    case PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_REJECTED:
    case PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_FULFILLED:
    case USER.LOGOUT_SENT:
    case USER.LOGOUT_FULFILLED:
    case USER.LOGOUT_REJECTED:
    case USER.GET_MEALS_SENT:
    case USER.GET_MEALS_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    default:
      // console.log(action.type);
      return { ...state };
  }
};
const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.GET_PROFILE_FULFILLED:
      return {
        ...state,
        ...action.payload
      };
    case USER.LOGOUT_FULFILLED:
      return {};
    case PROFILE.GET_USER_TRANSACTIONS_SENT:
      return {
        ...state,
        isTransactionsLoading: true
      };
    case PROFILE.GET_USER_TRANSACTIONS_FULFILLED:
      return {
        ...state,
        isTransactionsLoading: false,
        transactions: action.payload
      };
    case PROFILE.GET_USER_TRANSACTIONS_REJECTED:
      return {
        ...state,
        isTransactionsLoading: false
      };
    default:
      // console.log(action.type);
      return { ...state };
  }
};
const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer
});
export default reducer;
