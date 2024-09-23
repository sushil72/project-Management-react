import api from "../Auth/api";
import * as actionTypes from "./ActionType";

export const sendMessage = (messageData) => async (dispatch) => {
  dispatch({ type: actionTypes.SEND_MESSAGE_REQUEST });
  // console.log("msg Data : ", messageData);
  try {
    const response = await api.post("/api/messages/send", messageData);
    dispatch({
      type: actionTypes.SEND_MESSAGE_SUCCESS,
      message: response.data,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    dispatch({
      type: actionTypes.SEND_MESSAGE_FAILURE,
      error: error.message,
    });
  }
};

export const fetchChatMessages = (chatId) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_CHAT_MESSAGE_REQUEST });
  try {
    const response = await api.get(`/api/messages/chat/${chatId}`);
    dispatch({
      type: actionTypes.FETCH_CHAT_MESSAGE_SUCCESS,
      chatId,
      messages: response.data,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    dispatch({
      type: actionTypes.FETCH_CHAT_MESSAGE_FAILURE,
      chatId,
      error: error.message,
    });
  }
};

export const fetchChatByProject = (projectId) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST });
  try {
    const response = await api.get(`/api/projects/${projectId}/chat`);
    dispatch({
      type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
      chat: response.data,
    });
  } catch (error) {
    console.error("Error fetching chat by project:", error);
    dispatch({
      type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
      error: error.message,
    });
  }
};
