import { useState } from 'react';
import UserAvatar from '../User/UserAvatar';

export default function PostCommentCard({
    avatar,
    username,
}: {
    avatar: string | null;
    username: string;
}) {
    const [value, setValue] = useState('');
    const [isReplying, setRyplying] = useState(false);

    return (
        <div
            className={`${
                isReplying ? 'pt-2' : 'pt-4'
            } border-y border-white/20  mt-4  px-4`}
        >
            <p
                className={
                    isReplying
                        ? 'mb-2 text-white/50 text-[12px] md:text-sm'
                        : 'hidden'
                }
            >
                Replying to {''}
                <span className="text-purple-600">@{username}</span>
            </p>
            <div className="relative flex flex-col">
                <div className="flex gap-4 ">
                    <UserAvatar avatar={avatar} username={username} />

                    <textarea
                        onClick={() => setRyplying(true)}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        className="text-sm md:text-base w-full flex bg-transparent min-h-[50px] overflow-hidden resize-none focus:outline-none"
                        placeholder="Reply"
                        maxLength={280}
                    ></textarea>
                    <button
                        disabled
                        className={
                            isReplying
                                ? 'hidden'
                                : 'bg-purple-900 text-white/50 font-semibold text-sm px-2 py-1 md:px-4 md:py-2  h-max w-max rounded'
                        }
                    >
                        Reply
                    </button>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => {}}
                        disabled={value === ''}
                        className={`${isReplying ? '' : 'hidden'} ${
                            value === ''
                                ? 'bg-purple-900 text-white/50'
                                : 'hover:bg-purple-600'
                        } w-max bg-purple-700 font-semibold text-sm px-2 py-1 md:px-4 md:py-2 transition-all  h-max rounded ml-auto mb-4`}
                    >
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
}
