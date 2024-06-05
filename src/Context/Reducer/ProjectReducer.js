



const ProjectReducer=(state=null,action)=>{

    switch(action.type){
        case "SET_PROJECTS":
            return{
                ...state,
                projects:action.projects
            }
        case "SET_PROJECTS_NULL":
            return{
                ...state,
                projects:null
            }
            case "DELETE_PROJECT":
                return {
                  ...state,
                  projects: state.projects.filter(project => project.id !== action.payload)
                };
            default :
              return state
    }}



    export default ProjectReducer