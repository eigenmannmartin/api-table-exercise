
import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const userListSchema = [user];

export const post = new schema.Entity('posts');
export const postListSchema = [post];

export const postWithUser = new schema.Entity('posts', { userId: user })