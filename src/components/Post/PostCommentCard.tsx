import { useState } from 'react';
import UserAvatar from '../User/UserAvatar';
import { usePosts, useUser } from '@/utils/atom';

export default function PostCommentCard({
    avatar,
    username,
    id,
}: {
    avatar: string | null;
    username: string;
    id: number;
}) {
    const [value, setValue] = useState('');
    const [isReplying, setRyplying] = useState(false);

    const [post, setPost] = usePosts();
    const [user, setUser] = useUser();

    const createComment = (postId: number) => {
        const newComment = {
            id: post.length + 1 || 1,
            userId: user!.id,
            content: value,
            liked: false,
            likes: 0,
        };

        const postFound = post.find((post) => post.id === postId);

        if (postFound) {
            postFound.comments = postFound.comments || [];
            postFound.comments.push(newComment);

            const newPost = {
                ...newComment,

                userId: user!.id,
            };

            const updatedPosts = post.map((p) =>
                p.id === postFound.id ? postFound : p
            );
            setPost([...updatedPosts, newPost]);

            setValue('');
        }
    };

    return (
        <div
            className={`${isReplying ? 'pt-2' : 'pt-4'} border-white/20   px-4`}
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
                        onClick={() => createComment(id)}
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
