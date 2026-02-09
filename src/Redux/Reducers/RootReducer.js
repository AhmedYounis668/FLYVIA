import {combineReducers} from 'redux'
import ClientReducer from './ClientReducer'
import BlogsReducer from './BlogsReducer'



export default combineReducers({
    AllClients:ClientReducer,
    AllBlogs:BlogsReducer,
})