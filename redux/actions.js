import { ipAddress } from "../constants";
import _ from "lodash";
import { AsyncStorage } from "react-native";

export const GENERAL = {
  GET_HOME_CONFIG_SENT: "GET_HOME_CONFIG_SENT",
  GET_HOME_CONFIG_FULFILLED: "GET_HOME_CONFIG_FULFILLED",
  GET_HOME_CONFIG_REJECTED: "GET_HOME_CONFIG_REJECTED",
  GET_CONTENT_BY_ID_SENT: "GET_CONTENT_BY_ID_SENT",
  GET_CONTENT_BY_ID_FULFILLED: "GET_CONTENT_BY_ID_FULFILLED",
  GET_CONTENT_BY_ID_REJECTED: "GET_CONTENT_BY_ID_REJECTED",
  CLEAR_CONTENT_BY_ID: "CLEAR_CONTENT_BY_ID",
  GET_SEARCH_SUGGESTION_SENT: "GET_SEARCH_SUGGESTION_SENT",
  GET_SEARCH_SUGGESTION_FULFILLED: "GET_SEARCH_SUGGESTION_FULFILLED",
  GET_SEARCH_SUGGESTION_REJECTED: "GET_SEARCH_SUGGESTION_REJECTED",
  GET_WATCHLIST_SENT: "GET_WATCHLIST_SENT",
  GET_WATCHLIST_FULFILLED: "GET_WATCHLIST_FULFILLED",
};

export const getHomeConfig = () => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL.GET_HOME_CONFIG_SENT,
    });
    const res = await fetch(ipAddress + "/api/general/home_config", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: GENERAL.GET_HOME_CONFIG_FULFILLED,
        payload: result._data,
      });
    } else {
      dispatch({
        type: GENERAL.GET_HOME_CONFIG_REJECTED,
        payload: result._message,
      });
    }
  } catch (error) {
    console.log("ERROR getHomeConfig", error.message);
    return Promise.reject(error.message);
  }
};

export const getContentById = (contentId) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL.GET_CONTENT_BY_ID_SENT,
    });
    const res = await fetch(ipAddress + `/api/general/contents/${contentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: GENERAL.GET_CONTENT_BY_ID_FULFILLED,
        payload: result._data,
      });
    } else {
      dispatch({
        type: GENERAL.GET_CONTENT_BY_ID_REJECTED,
        payload: result._message,
      });
    }
  } catch (error) {
    console.log("ERROR getContentById", error.message);
    return Promise.reject(error.message);
  }
};

export const clearContentById = () => (dispatch) => {
  try {
    dispatch({
      type: GENERAL.CLEAR_CONTENT_BY_ID,
    });
  } catch (error) {
    console.log("ERROR clearContentById", error.message);
  }
};

export const getSearchSuggestions = (searchText) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL.GET_SEARCH_SUGGESTION_SENT,
    });
    if (searchText) {
      const res = await fetch(
        ipAddress + `/api/general/search_suggestions?searchText=${searchText}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (result._status === "success") {
        dispatch({
          type: GENERAL.GET_SEARCH_SUGGESTION_FULFILLED,
          payload: result._data,
        });
      } else {
        dispatch({
          type: GENERAL.GET_SEARCH_SUGGESTION_REJECTED,
          payload: result._message,
        });
      }
    } else {
      let userSearchPref = await AsyncStorage.getItem("userSearchPref");
      if (!userSearchPref) {
        userSearchPref = "[]";
      }
      const searchResults = JSON.parse(userSearchPref);
      dispatch({
        type: GENERAL.GET_SEARCH_SUGGESTION_FULFILLED,
        payload: searchResults,
      });
    }
  } catch (error) {
    console.log("ERROR getContentById", error.message);
    return Promise.reject(error.message);
  }
};

export const refreshWatchList = (type, contentId) => async (dispatch) => {
  try {
    dispatch({
      type: GENERAL.GET_WATCHLIST_SENT,
    });
    let userWatchList = await AsyncStorage.getItem("userWatchList");
    if (!userWatchList) {
      userWatchList = "[]";
    }
    const userWatchListResults = JSON.parse(userWatchList);
    if (type === "add" || type === "remove") {
      const findExistingEntry = _.indexOf(userWatchListResults, contentId);
      if (findExistingEntry >= 0) {
        userWatchListResults.splice(findExistingEntry, 1);
      }

      if (type === "add") {
        userWatchListResults.unshift(contentId);
      }
      await AsyncStorage.setItem(
        "userWatchList",
        JSON.stringify(userWatchListResults)
      );
      dispatch({
        type: GENERAL.GET_WATCHLIST_FULFILLED,
        payload: userWatchListResults,
      });
    } else {
      dispatch({
        type: GENERAL.GET_WATCHLIST_FULFILLED,
        payload: userWatchListResults,
      });
    }
  } catch (error) {
    console.log("ERROR refreshWatchList", error.message);
    return Promise.reject(error.message);
  }
};
