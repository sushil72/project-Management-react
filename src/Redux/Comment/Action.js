import * as actiontypes from "./ActionType";
import api from "./@Api/api";

export const createComment=(commentData)=>{
  return async (dispatch)=>{
    dispatch({type:actiontypes.CREATE_COMMENT_REQUEST});
    try {
      const response = await api.post(
        '/api/comments',
        commentData
      );
      console.log("comment created ",response.data)
      dispatch({
        type:actiontypes.CREATE_COMMENT_SUCCESS,comment:response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type:actiontypes.CREATE_COMMENT_FAILURE,
        error:error.message,
      });
    }
  };
};

export const deleteComment=(commentId)=>{
  return async(dispatch) => {
    dispatch({type:actiontypes.DELETE_COMMENT_REQUEST});
    try{
      await api.delete(
        `/api/comments/${commentId}`
      );
      dispatch({type:actiontypes.DELETE_COMMENT_SUCCESS,commentId});
    }catch(error)
    {
      console.log("error",error );
      dispatch({
          type:actiontypes.DELETE_COMMENT_FAILURE,error:error.message,
      });
    }
  }
}

//Action for Fetching Comment 
export const fetchComments=(issueId)=>{
  return async (dispatch)=>{
    dispatch({
      type:actiontypes.FETCH_COMMENT_REQUEST});
      try{
        const response =await api.get(`/api/comment/${issueId}`);
        dispatch({
          type:actiontypes.FETCH_COMMENT_SUCCESS,comments:response.data,
        });
        console.log("fetched coments : ",response.data);
      }catch(error)
      {
        console.log("error",error);
      }
  };
};