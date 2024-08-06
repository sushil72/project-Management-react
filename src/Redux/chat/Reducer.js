import * as actionType from './ActionType';
const initialState={
  messages:[],
  loading:false,
  error:null,
  chat:null
};

const ChatReducer=(state=initialState,action)=>{
  switch(action.type){
    case actionType.FETCH_MESSAGE_REQUEST:
    case actionType.SEND_MESSAGE_REQUEST:
    case actionType.FETCH_CHAT_MESSAGE_REQUEST:
      return{
        ...state,
        loading:true,
        error:null
      };
      case actionType.FETCH_MESSAGE_SUCCESS:
      case actionType.FETCH_CHAT_MESSAGE_SUCCESS:
        return {
          ...state,
          loading:false,
          messages:[...state.messages,action.messages]
        };
        case actionType.FETCH_CHAT_BY_PROJECT_SUCCESS:
          return {
            ...state,
            loading:false,
            chat:action.chat
          };
        case actionType.FETCH_MESSAGE_FAILURE:
        case actionType.SEND_MESSAGE_FAILURE:
        case actionType.FETCH_CHAT_MESSAGE_FAILURE:
          return {
            ...state,
            loading:false,
            error:action.error
          };
          default:
            return state;
  }
};
export default ChatReducer;