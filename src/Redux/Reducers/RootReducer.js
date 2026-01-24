import {combineReducers} from 'redux'
import ClientReducer from './ClientReducer'



export default combineReducers({
    AllClients:ClientReducer,
})