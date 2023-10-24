import { useState } from 'react';

import { usePosts, useUser } from '@/utils/atom';
import Avatar from '../UI/Avatar';

export default function CreateCommentCard({
    username,
    id,
}: {
    username: string;
    id: number;
}) {
    const [value, setValue] = useState('');
    const [isReplying, setRyplying] = useState(false);

    const [post, setPost] = usePosts();
    const [user, setUser] = useUser();

    const createComment = (postId: number) => {
        const helper = post.find((p) => p.id === postId);

        const newComment = {
            id: helper?.comments ? helper?.comments.length + 1 : 1,
            userId: user!.id,
            content: value,
            liked: false,
            likes: 0,
        };

        const postFound = post.find((post) => post.id === postId);

        if (postFound) {
            postFound.comments = postFound.comments || [];
            postFound.comments.push(newComment);
            setPost([...post]);
            console.log(post);
            setValue('');
        }
    };

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
                    <div className="flex gap-4 ">
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
                            onClick={() => createComment(id)}
                            disabled={value === ''}
                            className={`${isReplying ? '' : 'hidden'} ${
                                value === ''
                                    ? 'bg-purple-900 text-white/50'
                                    : 'hover:bg-purple-600'
                            } w-max bg-purple-700 font-semibold text-sm px-2 py-1 md:px-4 md:py-2 transition-all  h-max rounded ml-auto`}
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
