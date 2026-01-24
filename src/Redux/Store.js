import { createStore,applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
// import {composeWithDevTools}from 'redux-devtools-extension'
import RootReducer from './Reducers/RootReducer'

const intialstate={}

const middleware=[thunk]

const store=createStore(RootReducer,intialstate,applyMiddleware(...middleware))

export default store