import { RSAA } from 'redux-api-middleware';

export const POSTS_REQUEST = "@@post/POSTS_REQUEST"
export const POSTS_SUCCESS = "@@post/POSTS_SUCCESS"
export const POSTS_FAILURE = "@@post/POSTS_FAILURE"

export const USERS_REQUEST = "@@user/USERS_REQUEST"
export const USERS_SUCCESS = "@@user/USERS_SUCCESS"
export const USERS_FAILURE = "@@user/USERS_FAILURE"

export const COMMENTS_REQUEST = "@@comment/USERS_REQUEST"
export const COMMENTS_SUCCESS = "@@comment/USERS_SUCCESS"
export const COMMENTS_FAILURE = "@@comment/USERS_FAILURE"

export const SET_PAGE_INDEX = "@@page/SET_PAGE_INDEX"
export const SET_PAGE_SIZE = "@@page/SET_PAGE_SIZE"

export function setPageIndex(index) {
    return {
        type: SET_PAGE_INDEX, payload: index
    }
}
export function setPageSize(size) {
    return {
        type: SET_PAGE_SIZE, payload: size
    }
}

// Here we dispatch api requests to the api middleware
export function loadData() {
    return (dispatch) => {
        dispatch({
            [RSAA]: {
                endpoint: 'https://jsonplaceholder.typicode.com/comments',
                method: 'GET',
                types: [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE]
            }
        })

        dispatch({
            [RSAA]: {
                endpoint: 'https://jsonplaceholder.typicode.com/users',
                method: 'GET',
                types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE]
            }
        })

        dispatch({
            [RSAA]: {
                endpoint: 'https://jsonplaceholder.typicode.com/posts',
                method: 'GET',
                types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE]
            }
        })
    }
}