import { useState } from 'react';
import { useUser } from '@/utils/atom';
import Avatar from '../UI/Avatar';
import { usePostAction } from '@/hooks/usePostAction';

export default function CreatePost() {
    const [user, setUser] = useUser();

    const [postValue, setValue] = useState('');
    const { createPost } = usePostAction();

    return (
        <form>
            <button
                disabled={postValue === ''}
                onClick={() => createPost(postValue, setValue)}
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
                    avatar={user?.avatar || null}
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
                    onClick={() => createPost(postValue, setValue)}
                    className={`${
                        postValue === ''
                            ? 'bg-purple-900 text-white/50'
                            : 'hover:bg-purple-600'
                    } bg-purple-700 px-4 py-1 font-semibold rounded transition-all  ml-auto flex`}
                >
                    Post
                </button>
            </div>
        </form>
    );
}
