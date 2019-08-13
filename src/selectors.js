import { pathOr } from 'ramda';

export const postsSelector = state => ({
    data: pathOr([], ['posts', 'data'], state),
    loading: pathOr([], ['posts', 'loading'], state),
})