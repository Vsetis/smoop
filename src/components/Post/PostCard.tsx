import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import {
    IconDots,
    IconHeart,
    IconMessage,
    IconReport,
    IconShare,
    IconTrash,
} from '@tabler/icons-react';

import { useUser, useUsers } from '@/utils/atom';
import { usePostAction } from '@/hooks/usePostAction';

import Avatar from '../UI/Avatar';
import Modal from '../RadixUI/Modal';
import CreateComment from './CreateComment';
import Dropdown from '../RadixUI/Dropdown';
import Button from '../UI/Button';

export default function PostCard({
    userId,
    content,
    isLiked,
    id,
    children,
    postRouter,
    count,
    reply,
}: {
    id: string;
    userId: string;
    content: string;
    isLiked: boolean;
    children?: React.ReactNode;
    postRouter?: boolean;
    reply?: string;
    count: { likes: number; comments?: number };
}) {
    const [liked, setLike] = useState(isLiked);
    const [user, setUser] = useUser();
    const [users, setUsers] = useUsers();
    const [open, setOpen] = useState(false);

    const { push } = useRouter();

    const userFound = useMemo(
        () => users.find((u) => u?.id === userId),
        [users]
    );

    const { deletePost, likePost } = usePostAction();

    return (
        <div>
            <div
                onClick={() =>
                    postRouter === true &&
                    push(`/${userFound!.username}/posts/${id}`)
                }
                className={`${
                    postRouter ? 'hover:bg-white/5 cursor-pointer' : ''
                } flex w-full md:gap-2 p-4 border-y border-white/20`}
            >
                <Avatar
                    size="md"
                    avatar={userFound?.avatar || null}
                    username={userFound!.username}
                />
                <div className="rounded mx-2 w-full ">
                    <div className="flex items-start justify-between ">
                        <div className="flex flex-col">
                            {reply && (
                                <p className="!text-[12px] md:text-sm text-white/60">
                                    Replying to{' '}
                                    <span className="text-purple-600 font-semibold">
                                        @{reply}
                                    </span>
                                </p>
                            )}
                            <div className="flex items-center gap-2 mb-2">
                                <p className=" text-white/80 font-semibold text-sm md:text-base">
                                    {userFound!.username}
                                </p>
                                <p className="!text-[12px] text-white/60">
                                    @{userFound!.name}
                                </p>
                            </div>
                        </div>
                        <Dropdown
                            triggerButton={
                                <button>
                                    <IconDots />
                                </button>
                            }
                        >
                            {user!.id === userId ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePost(id, userId);
                                    }}
                                    className="flex gap-2 items-center cursor-pointer transition-all hover:bg-red-500/20 px-2 py-1"
                                >
                                    <IconTrash className="text-red-500" />
                                    <p className="text-sm">Delete</p>
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Succesfuly reported!');
                                        }}
                                        className="flex gap-2 items-center cursor-pointer transition-all hover:bg-red-500/20 px-2 py-1"
                                    >
                                        <IconReport className="text-red-500" />
                                        <p className="text-sm">Report</p>
                                    </button>
                                </>
                            )}
                        </Dropdown>
                    </div>
                    <div className="mb-6">
                        <p className="text-white/90 text-sm">{content}</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            transparent
                            onClick={(e) => likePost(liked, setLike, id, e)}
                            className="flex gap-2 items-center"
                        >
                            <IconHeart
                                className={`${
                                    liked
                                        ? 'fill-red-500 stroke-transparent'
                                        : 'stroke-white'
                                } w-4 h-4 md:w-5 md:h-5`}
                            />
                            <span className="font-semibold !text-white/80 text-[12px] md:text-sm">
                                {count.likes}
                            </span>
                        </Button>
                        <Modal
                            open={open}
                            setOpen={setOpen}
                            triggerButton={
                                <button className="flex items-center gap-2">
                                    <IconMessage className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="font-semibold text-[12px] md:text-sm">
                                        {count.comments}
                                    </span>
                                </button>
                            }
                        >
                            <CreateComment
                                replyingTo={{
                                    username: userFound!.username,
                                    name: userFound!.name,
                                }}
                                post={{
                                    id: id,
                                    content: content,
                                }}
                            />
                        </Modal>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(
                                    `http://localhost:3000/${
                                        userFound!.username
                                    }/posts/${id}`
                                );
                            }}
                            transparent
                            className="flex gap-2 items-center"
                        >
                            <IconShare className="w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
