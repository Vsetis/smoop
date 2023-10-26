import { atom, useAtom } from 'jotai';
import { faker } from '@faker-js/faker';

type Post = {
    id: string;
    userId: string;
    replying?: number;
    content: string;
    liked: boolean;
    likes: number;
    comments?: {
        id: string;
        userId: string;
        content: string;
        liked: boolean;
        likes: number;
    }[];
} | null;

export type User = {
    id: string;
    username: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string | null;
    bio?: string;
    followed: { userId: string }[];
    following: { userId: string }[];
} | null;

type Notification = {
    id: string;
    forUserId: string;
    userId: string;
    like?: boolean;
    follow?: boolean;
    postId?: string;
    seen: boolean;
} | null;

function createRandomUser(): User {
    const id: string = faker.string.uuid();
    const username: string = faker.internet.displayName().toLowerCase();
    const name: string = faker.internet.userName().toLowerCase();
    const email: string = faker.internet.email();

    return {
        id,
        username,
        name,
        email,
        avatar: null,
        followed: [],
        following: [],
    };
}

const USERS: User[] = faker.helpers.multiple(createRandomUser, {
    count: 20,
});

function addFollowers(users: User[]): void {
    users.forEach((user) => {
        if (user) {
            const followingCount = faker.number.int(5);
            const followedCount = faker.number.int(5);

            for (let i = 0; i < followingCount; i++) {
                const randomUser = users[faker.number.int(users.length - 1)];
                if (
                    randomUser &&
                    randomUser.id !== user.id &&
                    !user.following.find(
                        (followed) => followed.userId === randomUser.id
                    )
                ) {
                    user.following.push({ userId: randomUser.id });
                    randomUser.followed.push({ userId: user.id });
                }
            }

            for (let i = 0; i < followedCount; i++) {
                const randomUser = users[faker.number.int(users.length - 1)];
                if (
                    randomUser &&
                    randomUser.id !== user.id &&
                    !user.followed.find(
                        (following) => following.userId === randomUser.id
                    )
                ) {
                    user.followed.push({ userId: randomUser.id });
                    randomUser.following.push({ userId: user.id });
                }
            }
        }
    });
}

addFollowers(USERS);

function createRandomPosts(users: User[], count: number) {
    const posts: Post[] = [];
    for (let i = 0; i < count; i++) {
        const userIndex = Math.floor(Math.random() * users.length);
        const user = users[userIndex];

        const post: Post = {
            id: faker.string.uuid(),
            userId: user!.id,
            content: faker.lorem.sentence(),
            liked: faker.datatype.boolean(),
            likes: faker.number.int(5000),
        };

        posts.push(post);
    }
    return posts;
}

const initialUsers = [
    {
        id: '0ffaafa4-4b9e-4a46-81c8-64e1a6bb4db80xcvdsfsdf',
        username: 'guest',
        name: 'guest',
        email: 'guest@smoop.cz',
        avatar: null,
        bio: 'amazing!',
        followed: [],
        following: [],
    },
    ...USERS,
];

const POSTS: Post[] = createRandomPosts(USERS, 10);

const userAtom = atom<User>(null);
const postAtom = atom<Post[]>(POSTS);
const usersAtom = atom<User[]>(initialUsers);
const notificationAtom = atom<Notification[]>([]);

export const useUser = () => useAtom(userAtom);
export const useUsers = () => useAtom(usersAtom);
export const usePosts = () => useAtom(postAtom);
export const useNotification = () => useAtom(notificationAtom);
