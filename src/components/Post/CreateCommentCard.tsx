import { useState } from 'react';

import { usePosts, useUser } from '@/utils/atom';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';
import { faker } from '@faker-js/faker';

export default function CreateCommentCard({
    username,
    id,
}: {
    username: string;
    id: string;
}) {
    const [value, setValue] = useState('');
    const [isReplying, setRyplying] = useState(false);

    const [post, setPost] = usePosts();
    const [user, setUser] = useUser();

    const createComment = (postId: string) => {
        const helper = post.find((p) => p?.id === postId);

        const newCommentId = faker.string.uuid();

        const newComment = {
            id: newCommentId,
            userId: user!.id,
            content: value,
            liked: false,
            likes: 0,
        };

        const postFound = post.find((post) => post?.id === postId);

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
                            onClick={() => createComment(id)}
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
