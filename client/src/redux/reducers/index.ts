import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import homeBlogs from './blogsHomeReducer'
import categories from './categoryReducer';
import otherInfo from './otherInfoReducer';
import comments from './commentReducer';
import blogsCategory from './blogsCategory';

export default combineReducers({
    auth,
    alert,
    homeBlogs,
    categories,
    otherInfo,
    comments,
    blogsCategory
});