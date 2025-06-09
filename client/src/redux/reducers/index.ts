import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import blogsHome from './blogsHomeReducer'

export default combineReducers({
    auth,
    alert,
    blogsHome
});