import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import homeBlogs from './blogsHomeReducer'
import categoryReducer from './categoryReducer';

export default combineReducers({
    auth,
    alert,
    homeBlogs,
    categoryReducer
});