import { combineReducers } from "redux";
import UserAuthReducer from "./UserAuthReducer";
import ProjectReducer from "./ProjectReducer";
import SearchReducer from "./SearchReducer";



const MyReducer= combineReducers({
    user:UserAuthReducer,
    projects:ProjectReducer,
    searchTerm:SearchReducer
})

export default MyReducer