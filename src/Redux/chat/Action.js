import api from "../Auth/api";
import * as actiontypes from "./ActionType";

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.SEND_MESSAGE_REQUEST });
    try {
      console.log("messageData mmc", messageData);

      const response = await api.post("/api/messages/send", messageData);

      dispatch({
        type: actiontypes.SEND_MESSAGE_SUCCESS,
        message: response.data,
      });
      // console.log("chat Data", response.data);

      console.log("message sent success");
    } catch (error) {
      console.log(error);
      dispatch({
        type: actiontypes.SEND_MESSAGE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchChatMessages = (chatId) => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.FETCH_CHAT_MESSAGE_REQUEST });
    try {
      console.log("chat id in action :", chatId);

      const response = await api.get(`/api/messages/chat/${chatId}`);
      dispatch({
        type: actiontypes.FETCH_CHAT_MESSAGE_SUCCESS,
        chatId,
        messages: response.data,
      });
      console.log("fetch message", response.data);
    } catch (error) {
      console.log("error : message not fpund  ", error);
      dispatch({
        type: actiontypes.FETCH_CHAT_MESSAGE_FAILURE,
        chatId,
        error: error.message,
      });
    }
  };
};

export const fetchChatByProject = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.FETCH_CHAT_BY_PROJECT_REQUEST });
    try {
      console.log("project  id in action :", projectId);

      const response = await api.get(`/api/projects/${projectId}/chat`);
      console.log("fetched chat", response.data);
      dispatch({
        type: actiontypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
        chat: response.data,
      });
    } catch (error) {
      console.log("error: chat not found  ", error);
      dispatch({
        type: actiontypes.FETCH_CHAT_BY_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};
