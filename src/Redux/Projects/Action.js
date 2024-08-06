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

//fetch projects

export const fetchProjects =
  ({ category, tags }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST });
    try {
      const { data } = await api.get("/api/projects", {
        params: (category, tags),
      });
      console.log("all projects fetched", data);
      dispatch({ type: FETCH_PROJECT_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };

//search projects
export const searchProjects =
  ({ keyword }) =>
  async (dispatch) => {
    dispatch({ type: SEARCH_PROJECT_REQUEST });
    try {
      console.log("Searching for keyword:", keyword);
      const { data } = await api.get("/api/projects/search?keyword=" + keyword);
      console.log("Searched projects are:", data);
      console.log("Searched projects are :", data);
      dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };

// export const searchProjects =
//   ({ keyword }) =>
//   async (dispatch) => {
//     dispatch({ type: SEARCH_PROJECT_REQUEST });
//     try {
//       const { data } = await api.get("/api/projects/search?keyword=" + keyword);
//       console.log("Searched projects are:", data);
//       dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//create projects
// export const createProjects =
//   ({ projectData }) =>
//   async (dispatch) => {
//     dispatch({ type: CREATE_PROJECT_REQUEST });
//     try {
//       const { data } = await api.post("/api/projects/create", projectData);
//       console.log("created projects..... :", data);
//       dispatch({ type: CREATE_PROJECT_SUCCESS, projects: data });
//     } catch (error) {
//       console.log(error);
//     }
//   };
export const createProjects = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    console.log("Project data being sent:", projectData);

    const { data } = await api.post("/api/projects/create", projectData);
    console.log("Created project response:", data);
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    console.log(
      "Error creating project:",
      error.response?.data || error.message
    );
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

//fetch project by id

export const fetchProjectById =
  ({ id }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
    try {
      const { data } = await api.get("/api/projects/" + id);
      console.log("fetched projects by id  are :", data);
      dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };

//Delete project

export const deleteProject =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const { data } = await api.delete("/api/projects/" + projectId);
      console.log("Deleted project is  :", data);
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
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      console.log("invite projects:", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, projects: data });
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
      console.log("Invitation accepted ", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
    }
  };
