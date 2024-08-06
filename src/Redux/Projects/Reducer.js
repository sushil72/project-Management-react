import {
  ACCEPT_INVITATION_REQUEST,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
  SEARCH_PROJECT_FAILURE,
} from "./ActionType";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  projectDetails: null,
  searchedProjects: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
    case INVITE_TO_PROJECT_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects,
        error: null,
      };

    case SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedProjects: action.projects,
        error: null,
      };

    // If you have a failure action
    case SEARCH_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.payload],
        error: null,
      };

    case FETCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        projectDetails: action.payload,
        error: null,
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
        error: null,
      };

    default:
      return state;
  }
};
