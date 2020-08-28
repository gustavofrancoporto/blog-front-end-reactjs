import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from "./reducers/auth";
import blogPostList from "./reducers/blogPostList";
import blogPost from "./reducers/blogPost";
import commentList from "./reducers/commentList";
import registration from "./reducers/registration";
import {reducer as formReducer} from 'redux-form';

const createRootReducer = (history) => combineReducers({
    blogPostList,
    blogPost,
    commentList,
    auth,
    registration,
    router: connectRouter(history),
    form: formReducer
});
export default createRootReducer;