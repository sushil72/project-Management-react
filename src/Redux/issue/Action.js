import * as actionTypes from "./Actiontypes";
import api from "../Auth/api";

export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUE_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issue/project/${id}`);
      dispatch({
        type: actionTypes.FETCH_ISSUE_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      await dispatch({
        type: actionTypes.FETCH_ISSUE_FAILURE,
        error: error.message,
      });
      console.error(error.message);
    }
  };
};

export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_ISSUE_BY_ID_REQUEST,
    });
    try {
      const response = await api.get(`/api/issue/${id}`);

      dispatch({
        type: actionTypes.FETCH_ISSUE_BY_ID_SUCCESS,
        issues: response.data,
      });

      console.log("issue fetched by id :", response.data);
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ISSUE_BY_ID_FAILURE,
        error: error.message,
      });
    }
  };
};

export const updateIssuesStatus = ({ id, status }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/issue/${id}/status/${status}`);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
        error: error.message,
      });
    }
  };
};

//assigned User To issue

export const assignedUserToIssue = ({ issueId, userId }) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
      const response = await api.put(
        `/api/issue/${issueId}/assignee/${userId}`
      );
      console.log("user assigned to issue : ", response.data);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
        error: error.message,
      });
    }
  };
};

//Action for creating an issue
export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
    try {
      const response = await api.post("/api/issue", issueData);

      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const deleteIssue = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
    try {
      await api.delete("/api/issue/" + id);
      dispatch({
        type: actionTypes.DELETE_ISSUE_SUCCESS,
        id,
      });
      console.log("issue Deleted successfully ");
    } catch (error) {
      await dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};
