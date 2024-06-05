

export const SET_PROJECTS=(projects)=>{
 
    return{
        type:"SET_PROJECTS",
        projects:projects,
    }
}


export const SET_PROJECTS_NULL=()=>{
    return{
        type:"SET_PROJECTS_NULL",
    }
}


export const DELETE_PROJECT = 'DELETE_PROJECT';


export const deleteProject = (projectId) => {
  return {
    type: DELETE_PROJECT,
    payload: projectId
  };
};






