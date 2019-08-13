import { combineReducers } from 'redux';
import { lensProp, set, compose } from 'ramda'

import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE } from '../actions'

const posts = (state = { error: false, loading: false, data: [] }, { type, payload }) => {
  switch (type) {
    case POSTS_REQUEST:
      return set(lensProp('loading'), true, state);
    case POSTS_SUCCESS:
      return compose(
        set(lensProp('loading'), false),
        set(lensProp('error'), false),
        set(lensProp('data'), payload)
      )(state)
    case POSTS_FAILURE:
      return compose(
        set(lensProp('loading'), false),
        set(lensProp('error'), true)
      )(state)
    default:
      return state;
  }
}

export default combineReducers({
  posts
})
