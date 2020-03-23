import { ipAddress } from "../constants";
import _ from "lodash";

export const GENERAL = {
  GET_HOME_CONFIG_SENT: "GET_HOME_CONFIG_SENT",
  GET_HOME_CONFIG_FULFILLED: "GET_HOME_CONFIG_FULFILLED",
  GET_HOME_CONFIG_REJECTED: "GET_HOME_CONFIG_REJECTED",
};

export const getHomeConfig = () => async dispatch => {
  try {
    dispatch({
      type: GENERAL.GET_HOME_CONFIG_SENT,
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
    return Promise.reject(error.message);
  }
};