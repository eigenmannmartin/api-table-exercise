import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import { userListSchema, postListSchema } from '../schemas'
import { lensProp, set, compose, identity, path } from 'ramda'

import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE, USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE } from '../actions'


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

export default combineReducers({
  posts: reducerFactory([POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE], (data) => path(['entities', 'posts'], normalize(data, postListSchema))),
  users: reducerFactory([USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE], (data) => path(['entities', 'users'], normalize(data, userListSchema)))
})
