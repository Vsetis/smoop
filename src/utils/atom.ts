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

type User = {
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

type Users = {
    id: string;
    username: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string | null;
    bio?: string;
    followed: { userId: string }[];
    following: { userId: string }[];
};

type Notification = {
    id: string;
    forUserId: number;
    userId: number;
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
    count: 5000,
});

function addFollowers(users: User[]): void {
    users.forEach((user) => {
        if (user) {
            const followingCount = faker.number.int(100);
            const followedCount = faker.number.int(100);

            for (let i = 0; i < followingCount; i++) {
                const randomUser = users[faker.number.int(users.length - 1)];
                if (
                    randomUser &&
                    !user.following.find(
                        (user) => user.userId === randomUser.id
                    )
                ) {
                    user.following.push({ userId: randomUser.id });
                }
            }

            for (let i = 0; i < followedCount; i++) {
                const randomUser = users[faker.number.int(users.length - 1)];
                if (
                    randomUser &&
                    !user.followed.find((user) => user.userId === randomUser.id)
                ) {
                    user.followed.push({ userId: randomUser.id });
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

const POSTS: Post[] = createRandomPosts(USERS, 20000);

const userAtom = atom<User>(null);
const postAtom = atom<Post[]>(POSTS);
const usersAtom = atom<Users[]>(USERS);
const notificationAtom = atom<Notification[]>([]);

export const useUser = () => useAtom(userAtom);
export const useUsers = () => useAtom(usersAtom);
export const usePosts = () => useAtom(postAtom);
export const useNotification = () => useAtom(notificationAtom);
