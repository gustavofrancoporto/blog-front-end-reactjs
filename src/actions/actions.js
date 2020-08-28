import {request} from "../agent";
import {
    BLOG_POST_ERROR,
    BLOG_POST_LIST_ADD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_LIST_REQUEST, BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_RECEIVED,
    BLOG_POST_REQUEST,
    BLOG_POST_UNLOAD, COMMENT_ADDED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVED,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD, USER_CONFIRMATION_SUCCESS,
    USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST, USER_REGISTER_COMPLETE, USER_REGISTER_SUCCESS,
    USER_SET_ID
} from "./constants";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";

export const blogPostListRequest = () => ({
    type: BLOG_POST_LIST_REQUEST,
});

export const blogPostListError = () => ({
    type: BLOG_POST_LIST_ERROR,
});

export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED,
    data
});

export const blogPostListSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    page
});

export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(blogPostListRequest());
        return request.get(`/blog_posts?page=${page}`)
            .then(response => dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostListError(error)));
    }
};

export const blogPostRequest = () => ({
    type: BLOG_POST_REQUEST,
});

export const blogPostError = () => ({
    type: BLOG_POST_ERROR,
});

export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED,
    data
});

export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD,
});

export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch(blogPostRequest());
        return request.get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};

export const blogPostAdd = () => ({
    type: BLOG_POST_LIST_ADD,
    data: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'A newly added blog post'
    }
});

export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,
});

export const commentListError = () => ({
    type: COMMENT_LIST_ERROR,
});

export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVED,
    data
});

export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD,
});

export const commentListFetch = (id, page = 1) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return request.get(`/blog_posts/${id}/comments?page=${page}`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    }
};

export const commentAdd = (comment, blogPostId) => {
    return (dispatch) => {
        return request.post('/comments', {
            content: comment,
            blogPost: `/api/blog_posts/${blogPostId}`
        }).then(response => {
            dispatch(commentAdded(response));
        }).catch(error => {
            if (401 === error.response.status) {
                return dispatch(userLogout());
            }
            throw new SubmissionError(parseApiErrors(error));
        });
    }
};

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return request.post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.userId)))
            .catch(error => {
                throw new SubmissionError({
                   _error: 'Username or password invalid'
                });
            })
    }
};

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const userRegister = (username, password, retypedPassword, email, name) => {
    return (dispatch) => {
        return request.post('/users', {username, password, retypedPassword, email, name}, false)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error));
            })
    }
};

export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    }
}

export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
        return request.post('/users/confirm', {confirmationToken}, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Confirmation token is invalid'
                });
            })
    }
};

export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    }
}

export const userRegisterComplete = () => {
    return {
        type: USER_REGISTER_COMPLETE
    }
}

export const userSetId = (userId) => ({
    type: USER_SET_ID,
    userId
});

export const userProfileRequest = () => ({
    type: USER_PROFILE_REQUEST,
});

export const userProfileError = (userId) => ({
    type: USER_PROFILE_ERROR,
    userId
});

export const userProfileReceived = (userId, userData) => ({
    type: USER_PROFILE_RECEIVED,
    userId,
    userData
});

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest())
        return request.get(`/users/${userId}`, true).then(
            response => dispatch(userProfileReceived(userId, response))
        ).catch(error => dispatch(userProfileError(userId)))
    }
} 