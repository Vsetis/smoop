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
    avatar: string | null;
    bio?: string;
} | null;

const postAtom = atom<Post[]>([]);
const userAtom = atom<User>(null);

export const useUser = () => useAtom(userAtom);
export const usePosts = () => useAtom(postAtom);
