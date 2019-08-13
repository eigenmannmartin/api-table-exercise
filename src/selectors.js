import { pathOr, propOr } from 'ramda';
import { denormalize } from 'normalizr';
import { postWithUser } from './schemas'

const posts = pathOr({}, ['posts', 'data'])
const users = pathOr({}, ['users', 'data'])

export const postsSelector = state => {
    const entities = {
        posts: posts(state),
        users: users(state)
    };
    const input = { posts: Object.keys(posts(state)) }
    const mySchema = { posts: [postWithUser] }

    return {
        data: propOr([], 'posts', denormalize(input, mySchema, entities)),
        loading: pathOr(null, ['posts', 'loading'], state),
    }
}