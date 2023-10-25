import { useState } from 'react';
import { useUser } from '@/utils/atom';
import { usePostAction } from '@/hooks/usePostAction';

import Avatar from '../UI/Avatar';
import Button from '../UI/Button';

export default function CreateCommentCard({
    username,
    id,
}: {
    username: string;
    id: string;
}) {
    const [value, setValue] = useState('');
    const [isReplying, setRyplying] = useState(false);
    const [user] = useUser();

    const { createComment } = usePostAction();

    return (
        <div className=" border-white/20   p-4">
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
            <form>
                <div className="relative flex flex-col">
                    <div className="flex gap-4 items-center">
                        <Avatar
                            size="md"
                            avatar={user?.avatar || null}
                            username={user!.username}
                        />

                        <textarea
                            onClick={() => setRyplying(true)}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            className="text-sm md:text-base w-full flex bg-transparent min-h-[50px] overflow-hidden resize-none focus:outline-none"
                            placeholder="Reply"
                            maxLength={280}
                        ></textarea>
                        <Button
                            disabled
                            size="sm"
                            className={
                                isReplying
                                    ? 'hidden'
                                    : '!bg-purple-900 !text-white/50'
                            }
                        >
                            Reply
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            size="sm"
                            onClick={() => createComment(id, value, setValue)}
                            disabled={value === ''}
                            className={`${
                                value === ''
                                    ? '!bg-purple-900 !text-white/50'
                                    : ''
                            } ${isReplying ? '' : 'hidden'}`}
                        >
                            Reply
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
