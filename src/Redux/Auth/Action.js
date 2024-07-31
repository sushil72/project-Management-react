import axios from "axios"
import { GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import API_BASE_URL from "./api"
export const register=userData=>async(dispatch)=>{
  dispatch({type:REGISTER_REQUEST})
  try{
    const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,userData)
    if(data.jwt)
    {
      localStorage.setItem("jwt",data.jwt)
      dispatch({type:REGISTER_SUCCESS,payload:data})
    }

    console.log("register sucess",data);
  }catch (error)
  {
    console.log(error);
  }
}

//Login
export const login=userData=>async(dispatch)=>{
  dispatch({type:LOGIN_REQUEST})
  try{
    const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,userData)
    if(data.jwt)
    {
      localStorage.setItem("jwt",data.jwt)
      dispatch({type:LOGIN_SUCCESS,payload:data})
    }
    
    console.log("register sucess",data);
  }catch (error)
  {
    console.log(error);
  }
}
//Get_USER

export const getUser=()=>async(dispatch)=>{
  dispatch({type:GET_USER_REQUEST})
  try{
    const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("jwt")}`
      } 
    })
    if(data.jwt)
    {
      localStorage.setItem("jwt",data.jwt)
      dispatch({type:REGISTER_SUCCESS,payload:data})
    }
    
    console.log("register sucess",data);
  }catch (error)
  {
    console.log(error);
  }
}

//logout

export const logout=()=> async (dispatch)=>{
  dispatch({type:LOGOUT})
  localStorage.clear();
}