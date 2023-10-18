import Image from 'next/image';
import { useState } from 'react';

import { usePosts, useUser } from '@/utils/atom';
import Avatar from '../UI/Avatar';

export default function CreatePost({
    avatar,
    username,
}: {
    avatar: string | null;
    username: string;
}) {
    const [post, setPost] = usePosts();
    const [user, setUser] = useUser();

    const [postValue, setValue] = useState('');

    const createPost = () => {
        if (user && postValue !== '') {
            const newPost = {
                id: post.length + 1,
                userId: user.id,
                content: postValue,
                liked: false,
                likes: 0,
            };
            setPost([...post, newPost]);
        }
    };

    return (
        <div className="p-4">
            <button
                disabled={postValue === ''}
                onClick={() => createPost()}
                className={`${
                    postValue === ''
                        ? 'bg-purple-900 text-white/50'
                        : 'hover:bg-purple-600'
                } bg-purple-700 px-4 py-1 font-semibold rounded transition-all  ml-auto flex absolute right-4 top-4 sm:hidden`}
            >
                Post
            </button>
            <div className="flex gap-8 ">
                <Avatar
                    size="md"
                    avatar={user!.avatar}
                    username={user!.username}
                />
                <textarea
                    className="w-full flex bg-transparent min-h-[100px] max-h-[auto] overflow-y-hidden resize-none text-2xl focus:outline-none p-4 mb-8"
                    onChange={(e) => setValue(e.currentTarget.value)}
                    value={postValue}
                    placeholder="What's on your mind?"
                    maxLength={280}
                ></textarea>
            </div>
            <div className="border-t border-white/20 pt-4 hidden sm:flex">
                <button
                    disabled={postValue === ''}
                    onClick={() => createPost()}
                    className={`${
                        postValue === ''
                            ? 'bg-purple-900 text-white/50'
                            : 'hover:bg-purple-600'
                    } bg-purple-700 px-4 py-1 font-semibold rounded transition-all  ml-auto flex`}
                >
                    Post
                </button>
            </div>
        </div>
    );
}
