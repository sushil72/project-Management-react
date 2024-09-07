import api from "../Auth/api";
import * as actiontypes from "./ActionType";

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({ type: actiontypes.SEND_MESSAGE_REQUEST });
    try {
      const response = await api.post("/api/messages/send", messageData);
      dispatch({
        type: actiontypes.SEND_MESSAGE_SUCCESS,
        message: response.data,
      });
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
      const response = await api.get(`/api/messages/chat/${chatId}`);
      console.log("fetch message", response.data);
      dispatch({
        type: actiontypes.FETCH_CHAT_MESSAGE_SUCCESS,
        chatId,
        messages: response.data,
      });
    } catch (error) {
      console.log("error : ", error);
      dispatch({
        type: actiontypes.FETCH_CHAT_MESSAGE_FAILURE,
        chatId,
        error: error.message,
      });
    }
  };
};
