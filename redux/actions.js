import { ipAddress } from "../constants";
import _ from "lodash";

export const GENERAL = {
  GET_HOME_CONFIG_SENT: "GET_HOME_CONFIG_SENT",
  GET_HOME_CONFIG_FULFILLED: "GET_HOME_CONFIG_FULFILLED",
  GET_HOME_CONFIG_REJECTED: "GET_HOME_CONFIG_REJECTED",
  GET_CONTENT_BY_ID_SENT: "GET_CONTENT_BY_ID_SENT",
  GET_CONTENT_BY_ID_FULFILLED: "GET_CONTENT_BY_ID_FULFILLED",
  GET_CONTENT_BY_ID_REJECTED: "GET_CONTENT_BY_ID_REJECTED",
  CLEAR_CONTENT_BY_ID: "CLEAR_CONTENT_BY_ID"
};

export const getHomeConfig = () => async dispatch => {
  try {
    dispatch({
      type: GENERAL.GET_HOME_CONFIG_SENT
    });
    const res = await fetch(ipAddress + "/api/general/home_config", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: GENERAL.GET_HOME_CONFIG_FULFILLED,
        payload: result._data
      });
    } else {
      dispatch({
        type: GENERAL.GET_HOME_CONFIG_REJECTED,
        payload: result._message
      });
    }
  } catch (error) {
    console.log("ERROR getHomeConfig", error.message);
    return Promise.reject(error.message);
  }
};

export const getContentById = contentId => async dispatch => {
  try {
    dispatch({
      type: GENERAL.GET_CONTENT_BY_ID_SENT
    });
    const res = await fetch(ipAddress + `/api/general/contents/${contentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: GENERAL.GET_CONTENT_BY_ID_FULFILLED,
        payload: result._data
      });
    } else {
      dispatch({
        type: GENERAL.GET_CONTENT_BY_ID_REJECTED,
        payload: result._message
      });
    }
  } catch (error) {
    console.log("ERROR getContentById", error.message);
    return Promise.reject(error.message);
  }
};

export const clearContentById = () => dispatch => {
  try {
    dispatch({
      type: GENERAL.CLEAR_CONTENT_BY_ID
    });
  } catch (error) {
    console.log("ERROR clearContentById", error.message);
  }
};
