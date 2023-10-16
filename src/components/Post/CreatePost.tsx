import Image from 'next/image';
import { useState } from 'react';

import { usePosts, useUser } from '@/utils/atom';

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
                author: user,
                content: postValue,
                liked: false,
                likes: 0,
            };
            setPost([...post, newPost]);
        }
    };

    return (
        <div>
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
                <div>
                    {!!avatar ? (
                        <Image
                            width={40}
                            height={40}
                            className="rounded-full mb-2"
                            src={avatar}
                            alt={`${username} profile avatar`}
                        ></Image>
                    ) : (
                        <div className="mb-2 rounded-full w-14 h-14 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                    )}
                </div>
                <textarea
                    className="w-full flex bg-transparent min-h-[200px] overflow-auto resize-none text-2xl focus:outline-none"
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
