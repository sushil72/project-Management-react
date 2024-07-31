import api from "../Auth/api"
import { CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionType"

//fetch projects

export const fetchProjects=({category,tags})=>async (dispatch)=>{
dispatch({type:FETCH_PROJECT_REQUEST})
  try {
  const {data}=await api.get("/api/projects",{params:(category,tags)})
  console.log("all projects fetched",data);
  dispatch({type:FETCH_PROJECT_SUCCESS,projects:data
  })
  } catch (error) {
    console.log(error);
  }
}

//search projects 
export const searchProjects=({keyword})=>async (dispatch)=>{
  dispatch({type:SEARCH_PROJECT_REQUEST})
    try {
const {data}=await api.get("/api/projects/search?keyword="+keyword)
    console.log("Searched projects are :",data);
    dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data
    })
    } catch (error) {
      console.log(error);
    }
  }

  //create projects 
  export const createProjects=({projectData})=>async (dispatch)=>{
    dispatch({type:CREATE_PROJECT_REQUEST})
      try {
  const {data}=await api.post("/api/projects/",projectData)
      console.log("created project :",data);
      dispatch({type:CREATE_PROJECT_SUCESS,projects:data
      })
      } catch (error) {
        console.log(error);
      }
    }

    //fetch project by id 

    export const fetchProjectById=({id})=>async (dispatch)=>{
      dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
        try {
    const {data}=await api.get("/api/projects/"+id)
        console.log("fetched projects by id  are :",data);
        dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS,projects:data
        })
        } catch (error) {
          console.log(error);
        }
      }

      //Delete project

      export const deleteProject=({projectId})=>async (dispatch)=>{
        dispatch({type:DELETE_PROJECT_REQUEST})
          try {
      const {data}=await api.get("/api/projects/"+projectId)
          console.log("Deleted project is  :",data);
          dispatch({type:DELETE_PROJECT_SUCCESS,projectId})
          } catch (error) {
            console.log(error);
          }
        }