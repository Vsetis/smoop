import { useState } from 'react';
import { useUser } from '@/utils/atom';
import Avatar from '../UI/Avatar';
import { usePostAction } from '@/hooks/usePostAction';
import Button from '../UI/Button';

export default function CreatePost() {
    const [user, setUser] = useUser();

    const [postValue, setValue] = useState('');
    const { createPost } = usePostAction();

    return (
        <form>
            <Button
                onClick={() => createPost(postValue, setValue)}
                disabled={postValue === ''}
                size="sm"
                className={`${
                    postValue === '' && '!bg-purple-900 !text-white/50 '
                } ml-auto absolute top-4 right-4 sm:hidden`}
            >
                Post
            </Button>
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
                <Button
                    onClick={() => createPost(postValue, setValue)}
                    disabled={postValue === ''}
                    size="sm"
                    className={`${
                        postValue === '' && '!bg-purple-900 !text-white/50 '
                    } ml-auto`}
                >
                    Post
                </Button>
            </div>
        </form>
    );
}
