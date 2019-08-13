import { pathOr, last, toPairs, compose, map, set, lensProp, propOr, propEq, filter } from 'ramda';

const selectPosts = pathOr({}, ['posts', 'data'])
const selectUsers = pathOr({}, ['users', 'data'])
const selectComments = pathOr({}, ['comments', 'data'])
const selectPageSize = pathOr({}, ['page', 'size'])
const selectPageIndex = pathOr({}, ['page', 'index'])

export const postsSelector = state => {
    const comments = selectComments(state)
    const users = selectUsers(state)
    const pageSize = selectPageSize(state)
    const pageIndex = selectPageIndex(state)

    // We "need" all data to be loaded in order to remove the loading flag
    const loading = [
        pathOr(null, ['posts', 'loading'], state),
        pathOr(null, ['users', 'loading'], state),
        pathOr(null, ['comments', 'loading'], state)
    ].some(Boolean)

    const data = compose(
        // compute the commentCount - here we could use memization
        map(post => set(
            lensProp('commentCount'),
            Object.keys(filter(propEq('postId', post.id), comments)).length,
            post
        )),
        // adds the user - memoization might improve performance here as well
        map(post => set(
            lensProp('user'),
            propOr(null, post.userId, users),
            post
        )),
        // normalizer does not handle foreign key denormalization :'(
        map(last),
        toPairs,
        selectPosts
    )(state)

    return {
        data: data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize),
        loading,
        // We could use a different selector for this... but it feels like these props belong here
        pageCount: Math.ceil(data.length / pageSize),
        pageSize,
        pageIndex,
    }
}