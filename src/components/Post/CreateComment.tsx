import { useState } from 'react';
import { useUser } from '@/utils/atom';
import Avatar from '../UI/Avatar';
import { usePostAction } from '@/hooks/usePostAction';

export default function CreateComment({
    replyingTo,
    post,
}: {
    replyingTo: { username: string; name: string };
    post: { id: number; content: string };
}) {
    const [user, setUser] = useUser();

    const [value, setValue] = useState('');
    const { createComment } = usePostAction();

    return (
        <>
            <div className="flex gap-4">
                <div className="flex flex-col w-max items-center">
                    <Avatar size="md" avatar={null} username="guest"></Avatar>
                    <div className="flex ">
                        <div className="w-[2px]  min-h-[55px] bg-white/20" />
                    </div>
                </div>
                <div>
                    <div className="mb-1 flex items-center gap-2">
                        <p className="font-semibold leading-none">
                            {replyingTo.username}
                        </p>
                        <p className="text-white/80 text-sm">
                            @{replyingTo.name}
                        </p>
                    </div>
                    <p className="text-sm mb-4">{post.content}</p>
                    <p className="text-sm text-white/60">
                        Replying to {''}
                        <span className="text-purple-600 font-semibold">
                            @{replyingTo.username}
                        </span>
                    </p>
                </div>
            </div>
            <form>
                <div className="flex gap-4">
                    <Avatar
                        size="md"
                        avatar={user?.avatar || null}
                        username={user!.username}
                    />
                    <textarea
                        className="w-full flex bg-transparent min-h-[80px] overflow-y-hidden resize-none text-lg  focus:outline-none  mb-8"
                        onChange={(e) => setValue(e.currentTarget.value)}
                        value={value}
                        placeholder="Post your reply"
                        maxLength={280}
                    ></textarea>
                </div>
                <button
                    disabled={value === ''}
                    onClick={() => createComment(post.id, value, setValue)}
                    className={`${
                        value === ''
                            ? 'bg-purple-900 text-white/50'
                            : 'hover:bg-purple-600'
                    } bg-purple-700 px-4 py-1 font-semibold rounded transition-all  ml-auto flex`}
                >
                    Comment
                </button>
            </form>
        </>
    );
}
