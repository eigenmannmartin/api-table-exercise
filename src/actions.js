import { RSAA } from 'redux-api-middleware';

export const POSTS_REQUEST = "@@post/POSTS_REQUEST"
export const POSTS_SUCCESS = "@@post/POSTS_SUCCESS"
export const POSTS_FAILURE = "@@post/POSTS_FAILURE"

export const APPLY_POSTS = "APPLY_POSTS"

export function loadPosts() {
    return {
        [RSAA]: {
            endpoint: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE]
        }
    }
}