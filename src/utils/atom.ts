import { Post, User } from '@/types';
import { atom, useAtom } from 'jotai';

const postAtom = atom<Post[]>([]);
const userAtom = atom<User>(null);

export const useUser = () => useAtom(userAtom);
export const usePosts = () => useAtom(postAtom);
