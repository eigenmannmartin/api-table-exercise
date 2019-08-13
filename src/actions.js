import { RSAA } from 'redux-api-middleware';

export const POSTS_REQUEST = "@@post/POSTS_REQUEST"
export const POSTS_SUCCESS = "@@post/POSTS_SUCCESS"
export const POSTS_FAILURE = "@@post/POSTS_FAILURE"

export const USERS_REQUEST = "@@user/USERS_REQUEST"
export const USERS_SUCCESS = "@@user/USERS_SUCCESS"
export const USERS_FAILURE = "@@user/USERS_FAILURE"

export const APPLY_POSTS = "APPLY_POSTS"

export function loadData() {
    return (dispatch) => {
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