import api from "@/Api/api";

import * as actiontypes from "./ActionType";
import { type } from "os";

export const sendMessage=(messageData)=>{
  return async(dispatch)=>{
    dispatch({type: actiontypes.SEND_MESSAGE_REQUEST});
    try{
      const response = await api.post(
        "/api/messages/send",
        messageData,
      );
      dispatch({
        type:actiontypes.SEND_MESSAGE_SUCCESS,message: response.data
      });

    }catch(error)
    {
      console.log(error);
      dispatch({
        type:actiontypes.SEND_MESSAGE_FAILURE,error:error.message,
      });
    }
  };
};

export const fetchChatMessages = (chatId)
{
  return async (dispatch)=>{
    dispatch({type: actiontypes.FETCH_CHAT_MESSAGE_REQUEST});
    try{
      const response = await api.get(
        `/api/messages/chat/${chatId}`
      );
      console.log("fetch message",response.data)
      dispatch({
        type:actiontypes.FETCH_CHAT_MESSAGE_SUCCESS,chatId,
        message: response.data,
      });
    }catch(error){
      console.log("error --",error);
      dispatch({
        type:actiontypes.FETCH_CHAT_MESSAGE_FAILURE,chatId,
        message:error.message
      });
    }
  }
}


