import api from "../Auth/api";
import {
  ACCEPT_INVITATION_REQUEST,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESS,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
} from "./ActionType";

export const fetchProjects =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST });
    try {
      console.log("category: ", category, ", tag: ", tag);

      const { data } = await api.get("/api/projects", {
        params: { Category: category, tag: tag },
      });

      dispatch({ type: FETCH_PROJECT_SUCCESS, projects: data });
      console.log("Data by tag : ", data);
    } catch (error) {
      console.log(error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  console.log("keyWord in action : ", keyword);

  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
    console.log("searched project : ", data);
  } catch (error) {
    console.log(error);
  }
};

export const createProjects = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects/create", projectData);
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

//fetch project by id

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects/" + id);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, projects: data });
    console.log("ny id  : ", data);
  } catch (error) {
    console.log(error.message);
  }
};

//Delete project

export const deleteProject =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const { data } = await api.delete("/api/projects/" + projectId);
      // console.log("Deleted project is  :", data);
      dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
      console.log(error);
    }
  };

//invitiation

export const inviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    console.log("email and projectId : ", email);
    console.log(projectId);

    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      // console.log("invite projects:", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, projects: data });
      console.log("invitation sent ");
    } catch (error) {
      console.log(error);
    }
  };

//Accept invitation

export const acceptInvitation =
  ({ invitationToken, navigate }) =>
  async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: {
          token: invitationToken,
        },
      });
      navigate("/project" + data.projectId);
      // console.log("Invitation accepted ", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };
