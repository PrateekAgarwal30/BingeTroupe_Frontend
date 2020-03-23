import { AsyncStorage } from "react-native";
import { ipAddress } from "../constants";
import _ from "lodash";

export const LOGIN = {
  LOGIN_SENT: "LOGIN_SENT",
  LOGIN_FULFILLED: "LOGIN_FULFILLED",
  LOGIN_REJECTED: "LOGIN_REJECTED",
  LOGIN_TEXT_CHANGE: "LOGIN_TEXT_CHANGE"
};
export const REGISTER = {
  REGISTER_SENT: "REGISTER_SENT",
  REGISTER_FULFILLED: "REGISTER_FULFILLED",
  REGISTER_REJECTED: "REGISTER_REJECTED"
};
export const PROFILE = {
  UPDATE_PROFILE_SENT: "UPDATE_PROFILE_SENT",
  UPDATE_PROFILE_FULFILLED: "UPDATE_PROFILE_FULFILLED",
  UPDATE_PROFILE_REJECTED: "UPDATE_PROFILE_REJECTED",
  GET_TP_ADDRESSES_SENT: "GET_TP_ADDRESSES_SENT",
  GET_TP_ADDRESSES_FULFILLED: "GET_TP_ADDRESSES_FULFILLED",
  GET_TP_ADDRESSES_REJECTED: "GET_TP_ADDRESSES_REJECTED",
  SAVE_OFFICE_ADDRESS_FOR_USER_SENT: "SAVE_OFFICE_ADDRESS_FOR_USER_SENT",
  SAVE_OFFICE_ADDRESS_FOR_USER_FULFILLED:
    "SAVE_OFFICE_ADDRESS_FOR_USER_FULFILLED",
  SAVE_OFFICE_ADDRESS_FOR_USER_REJECTED:
    "SAVE_OFFICE_ADDRESS_FOR_USER_REJECTED",
  GET_USER_TRANSACTIONS_SENT: "GET_USER_TRANSACTIONS_SENT",
  GET_USER_TRANSACTIONS_FULFILLED: "GET_USER_TRANSACTIONS_FULFILLED",
  GET_USER_TRANSACTIONS_REJECTED: "GET_USER_TRANSACTIONS_REJECTED"
};
export const USER = {
  GET_PROFILE_SENT: "GET_PROFILE_SENT",
  GET_PROFILE_FULFILLED: "GET_PROFILE_FULFILLED",
  GET_PROFILE_REJECTED: "GET_PROFILE_REJECTED",
  CHANGE_PASS_SENT: "CHANGE_PASS_SENT",
  CHANGE_PASS_FULFILLED: "CHANGE_PASS_FULFILLED",
  CHANGE_PASS_REJECTED: "CHANGE_PASS_REJECTED",
  LOGOUT_SENT: "LOGOUT_SENT",
  LOGOUT_FULFILLED: "LOGOUT_FULFILLED",
  LOGOUT_REJECTED: "LOGOUT_REJECTED",
  GET_MEALS_SENT: "GET_MEALS_SENT",
  GET_MEALS_FULFILLED: "GET_MEALS_FULFILLED",
  GET_MEALS_REJECTED: "GET_MEALS_REJECTED",
  POST_CART_ITEMS_SENT: "POST_CART_ITEMS_SENT",
  POST_CART_ITEMS_FULFILLED: "POST_CART_ITEMS_FULFILLED",
  POST_CART_ITEMS_REJECTED: "POST_CART_ITEMS_REJECTED",
  CLEAR_CART_ITEMS: "CLEAR_CART_ITEMS"
};

export const textChange = () => dispatch => {
  dispatch({ type: LOGIN.LOGIN_TEXT_CHANGE });
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN.LOGIN_SENT, payload: { isLoading: true } });
    let jwtToken = null;
    const res = await fetch(ipAddress + "/api/auth", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }) // body data type must match "Content-Type" header
    });
    jwtToken = res.headers.get("x-auth-token");
    const result = await res.json();
    if (result._status === "success") {
      await AsyncStorage.setItem("authToken", jwtToken);
      dispatch({
        type: LOGIN.LOGIN_FULFILLED,
        payload: { isLoading: false }
      });
    } else {
      dispatch({
        type: LOGIN.LOGIN_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const register = (email, password) => async dispatch => {
  try {
    dispatch({ type: REGISTER.REGISTER_SENT, payload: { isLoading: true } });
    let jwtToken = null;
    const res = await fetch(ipAddress + "/api/auth/register", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }) // body data type must match "Content-Type" header
    });
    jwtToken = res.headers.get("x-auth-token");
    const result = await res.json();
    if (result._status === "success") {
      await AsyncStorage.setItem("authToken", jwtToken);
      dispatch({
        type: REGISTER.REGISTER_FULFILLED,
        payload: { isLoading: false }
      });
    } else {
      dispatch({
        type: REGISTER.REGISTER_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getProfile = () => async dispatch => {
  try {
    const jwtToken = await AsyncStorage.getItem("authToken");
    dispatch({
      type: USER.GET_PROFILE_SENT,
      payload: {
        isLoading: true
      }
    });
    const res = await fetch(ipAddress + "/api/me", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      }
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: USER.GET_PROFILE_FULFILLED,
        payload: result._data
      });
    } else {
      dispatch({
        type: USER.GET_PROFILE_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const changePassword = (oldp, confirmp, newp) => async dispatch => {
  try {
    dispatch({
      type: USER.CHANGE_PASS_SENT,
      payload: { isLoading: true, err: null }
    });
    const jwtToken = await AsyncStorage.getItem("authToken");
    const res = await fetch(ipAddress + "/api/auth/change_password", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      },
      body: JSON.stringify({ oldp: oldp, confirmp: confirmp, newp: newp }) // body data type must match "Content-Type" header
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: USER.CHANGE_PASS_FULFILLED,
        payload: { isLoading: false }
      });
      return "Password Change Succesfully";
    } else {
      dispatch({
        type: USER.CHANGE_PASS_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
      return Promise.reject("Change Password Failed");
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const logOut = () => async dispatch => {
  try {
    dispatch({
      type: USER.LOGOUT_SENT,
      payload: { err: null, isLoading: true }
    });
    await AsyncStorage.clear();
    dispatch({
      type: USER.LOGOUT_FULFILLED,
      payload: { err: null, isLoading: false }
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: USER.LOGOUT_REJECTED,
      payload: { err: null, isLoading: false }
    });
    return Promise.reject(error.message);
  }
};
export const updateProfile = Obj => async dispatch => {
  try {
    dispatch({
      type: PROFILE.UPDATE_PROFILE_SENT,
      payload: { isLoading: true, err: null }
    });
    const jwtToken = await AsyncStorage.getItem("authToken");
    const res = await fetch(ipAddress + "/api/me/details", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      },
      body: JSON.stringify(Obj) // body data type must match "Content-Type" header
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: PROFILE.UPDATE_PROFILE_FULFILLED,
        payload: { isLoading: true }
      });
      return Promise.resolve("Details Updated successfully!");
    } else {
      dispatch({
        type: PROFILE.UPDATE_PROFILE_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
      return Promise.resolve("Details Update Failed.Try Later...");
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getTechAddresses = (
  searchAddressQuery,
  initialLoad
) => async dispatch => {
  try {
    const jwtToken = await AsyncStorage.getItem("authToken");
    dispatch({
      type: PROFILE.GET_TP_ADDRESSES_SENT,
      payload: {
        isLoading: initialLoad
      }
    });
    const url = `${ipAddress}/api/general/techparks${
      searchAddressQuery ? "?searchAddressQuery=" + searchAddressQuery : ""
    }`;
    const res = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      }
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: PROFILE.GET_TP_ADDRESSES_FULFILLED,
        payload: result._data
      });
      return Promise.resolve("FULFILLED");
    } else {
      dispatch({
        type: PROFILE.GET_TP_ADDRESSES_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
      return Promise.resolve("REJECTED");
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const saveOfficeAddressForUser = Obj => async dispatch => {
  try {
    dispatch({
      type: PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_SENT,
      payload: { isLoading: true, err: null }
    });
    const jwtToken = await AsyncStorage.getItem("authToken");
    const res = await fetch(ipAddress + "/api/me/user_address", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      },
      body: JSON.stringify(Obj) // body data type must match "Content-Type" header
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_FULFILLED
      });
      return Promise.resolve("Address Saved successfully!");
    } else {
      dispatch({
        type: PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
      return Promise.resolve("Save Address Failed.Try Later...");
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const _uploadImage = async uploadUrl => {
  // console.log("uploadUrl", uploadUrl);
  try {
    let uploadData = new FormData();
    const jwtToken = await AsyncStorage.getItem("authToken");
    uploadData.append("submit", "ok");
    if (_.endsWith(uploadUrl, ".png")) {
      uploadData.append("avatar", {
        type: "image/png",
        uri: uploadUrl,
        name: "uploadimagetemp.png"
      });
    } else {
      uploadData.append("avatar", {
        type: "image/jpeg",
        uri: uploadUrl,
        name: "uploadimagetemp.jpeg"
      });
    }
    const res = await fetch(`${ipAddress}/api/me/user_image`, {
      method: "post",
      headers: {
        "x-auth-token": jwtToken,
        "Content-Type": "multipart/form-data"
      },
      body: uploadData
    });
    const data = await res.json();
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err.message);
  }
};

export const pushNotifToken = async token => {
  try {
    const jwtToken = await AsyncStorage.getItem("authToken");
    const bodyData = { pushNotificationToken: token };
    const res = await fetch(`${ipAddress}/api/me/user_push_notif_token`, {
      method: "post",
      headers: {
        "x-auth-token": jwtToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });
    const data = await res.json();
    console.log("DATA", data);
    return Promise.resolve(data);
  } catch (err) {
    console.log("ERROR", err.message);
    return Promise.reject(err.message);
  }
};

export const getUserTransactions = () => async dispatch => {
  try {
    const jwtToken = await AsyncStorage.getItem("authToken");
    dispatch({
      type: PROFILE.GET_USER_TRANSACTIONS_SENT
    });
    const url = `${ipAddress}/api/me/transactions`;
    const res = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      }
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: PROFILE.GET_USER_TRANSACTIONS_FULFILLED,
        payload: result._data
      });
      return Promise.resolve("FULFILLED");
    } else {
      dispatch({
        type: PROFILE.GET_USER_TRANSACTIONS_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
      return Promise.resolve("REJECTED");
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMeals = () => async dispatch => {
  try {
    const jwtToken = await AsyncStorage.getItem("authToken");
    dispatch({
      type: USER.GET_MEALS_SENT,
      payload: {
        isLoading: true
      }
    });
    const res = await fetch(ipAddress + "/api/general/meals", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      }
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: USER.GET_MEALS_FULFILLED,
        payload: result._data
      });
    } else {
      dispatch({
        type: USER.GET_MEALS_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const postCartItems = items => async dispatch => {
  try {
    dispatch({ type: USER.POST_CART_ITEMS_SENT, payload: { isLoading: true } });
    const res = await fetch(ipAddress + "/api/general/cart", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cartItems: items }) // body data type must match "Content-Type" header
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: USER.POST_CART_ITEMS_FULFILLED,
        payload: result._data
      });
    } else {
      dispatch({
        type: USER.POST_CART_ITEMS_REJECTED,
        payload: { err: result._message }
      });
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const clearCartItems = () => dispatch => {
  try {
    dispatch({ type: USER.CLEAR_CART_ITEMS });
  } catch (error) {
    console.log("clearCartItems", error.message);
  }
};
