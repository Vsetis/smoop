import { posts } from '@/mock/posts';
import { session } from '@/mock/session';
import { usePosts } from '@/utils/atom';
import { create } from 'domain';
import Image from 'next/image';
import { useState } from 'react';
export default function CreatePost({
    avatar,
    username,
}: {
    avatar: string | null;
    username: string;
}) {
    const [post, setPost] = usePosts();

    const [postValue, setValue] = useState('');

    const createPost = () => {
        if (session && session.user && postValue !== '') {
            const newPost = {
                id: post.length + 1,
                author: session!.user,
                content: postValue,
                liked: false,
                likes: 0,
            };
            setPost([...post, newPost]);
        }
    };

    return (
        <div>
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
            <div className="border-t border-white/20 pt-4">
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