import { notifications } from '@/mock/notifications';
import { posts } from '@/mock/posts';
import { users } from '@/mock/user';
import { atom, useAtom } from 'jotai';

type Post = {
    id: number;
    userId: number;
    replying?: number;
    content: string;
    liked: boolean;
    likes: number;
    comments?: {
        id: number;
        userId: number;
        content: string;
        liked: boolean;
        likes: number;
    }[];
};

type User = {
    id: number;
    username: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string | null;
    bio?: string;
    followed?: { userId: number }[];
    following?: { userId: number }[];
} | null;

type Users =
    | {
          id: number;
          username: string;
          name: string;
          email?: string;
          phone?: string;
          avatar?: string | null;
          bio?: string;
          followed?: { userId: number }[];
          following?: { userId: number }[];
      }[];

type Notification = {
    id: number;
    forUserId: number;
    userId: number;
    like?: boolean;
    follow?: boolean;
    postId?: number;
    seen: boolean;
}[];

const postAtom = atom<Post[]>(posts);
const userAtom = atom<User>(null);
const usersAtom = atom<Users>(users);
const notificationAtom = atom<Notification>(notifications);

export const useUser = () => useAtom(userAtom);
export const useUsers = () => useAtom(usersAtom);
export const usePosts = () => useAtom(postAtom);
export const useNotification = () => useAtom(notificationAtom);
