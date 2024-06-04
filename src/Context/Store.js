import { createStore } from "redux";
import MyReducer from "./Reducer/CombineReducer";




const Store=createStore(MyReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export default Store

