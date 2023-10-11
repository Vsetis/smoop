import { users } from './user';

const user = users.find((user) => user.username === 'guest');

export const session = {
    id: '387xldjsfk',
    user: user,
};
