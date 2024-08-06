import * as actionType from "./Actiontypes";
const initialState = {
  issues: [],
  loading: false,
  error: null,
  issueDetails: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_ISSUE_REQUEST:
    case actionType.DELETE_ISSUE_REQUEST:
    case actionType.CREATE_ISSUE_REQUEST:
    case actionType.FETCH_ISSUE_BY_ID_REQUEST:
    case actionType.ASSIGNED_ISSUE_TO_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        issues: action.issues,
      };
    case actionType.FETCH_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.issues,
      };
    case actionType.FETCH_ISSUE_BY_ID_SUCCESS:
    case actionType.UPDATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        issues: action.issues,
      };
    case actionType.CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [...state.issues, action.issues],
      };
    case actionType.ASSIGNED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id === action.issue.id ? action.issue : issue
        ),
      };
    case actionType.DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.filter((issue) => issue.id !== action.issueId),
      };
    case actionType.FETCH_ISSUE_FAILURE:
    case actionType.CREATE_ISSUE_FAILURE:
    case actionType.DELETE_ISSUE_FAILURE:
    case actionType.ASSIGNED_ISSUE_TO_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default issueReducer;
