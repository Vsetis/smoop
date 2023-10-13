import { Post } from '@/types';
import { atom, useAtom } from 'jotai';

const postAtom = atom<Post[]>([]);

export const usePosts = () => useAtom(postAtom);
