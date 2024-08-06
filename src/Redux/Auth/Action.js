import axios from "axios";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./ActionType";
import { API_BASE_URL } from "./api";

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("jwt", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      setAuthToken(data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    }
    console.log("Register success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signing`, userData);
    if (data.jwt) {
      setAuthToken(data.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    }
    console.log("Login success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });

    console.log("user Success", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  try {
    setAuthToken(null);
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log("Logout error:", error);
  }
};
