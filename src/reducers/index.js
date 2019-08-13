import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import { user, post, comment } from '../schemas'
import { lensProp, set, compose, identity, path } from 'ramda'

import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE, USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE, COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE, SET_PAGE_INDEX, SET_PAGE_SIZE } from '../actions'

// I was lazy and did not want to c&p this 3 times
const reducerFactory = ([REQUEST, SUCCESS, FAILURE], norm = identity) => (state = { error: false, loading: false, data: null }, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return set(lensProp('loading'), true, state);
    case SUCCESS:
      return compose(
        set(lensProp('loading'), false),
        set(lensProp('error'), false),
        set(lensProp('data'), norm(payload))
      )(state)
    case FAILURE:
      return compose(
        set(lensProp('loading'), false),
        set(lensProp('error'), true)
      )(state)
    default:
      return state;
  }
}

// if there are more reducers we could split it up into multiple files
const page = (state = { index: 0, size: 10 }, { type, payload }) => {
  switch (type) {
    case SET_PAGE_INDEX:
      return set(lensProp('index'), payload, state);
    case SET_PAGE_SIZE:
      return compose(
        set(lensProp('size'), payload),
        set(lensProp('index'), 0)
      )(state);
    default:
      return state;
  }
}

export default combineReducers({
  page,
  posts: reducerFactory(
    [POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE],
    (data) => path(['entities', 'posts'], normalize(data, [post]))
  ),
  users: reducerFactory(
    [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE],
    (data) => path(['entities', 'users'], normalize(data, [user]))
  ),
  comments: reducerFactory(
    [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE],
    (data) => path(['entities', 'comments'], normalize(data, [comment]))
  )
})
