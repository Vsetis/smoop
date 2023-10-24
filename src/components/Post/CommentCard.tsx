import { useMemo, useState } from 'react';

import {
    IconDots,
    IconHeart,
    IconReport,
    IconTrash,
} from '@tabler/icons-react';

import Dropdown from '../RadixUI/Dropdown';
import { useUser, useUsers } from '@/utils/atom';

import { usePostAction } from '@/hooks/usePostAction';
import Avatar from '../UI/Avatar';

export default function CommentCard({
    id,
    postId,
    authorId,
    postAuthorId,
    content,
    isLiked,
    likes,
}: {
    id: number;
    postId: number;
    authorId: number;
    postAuthorId: number;
    content: string;
    isLiked: boolean;
    likes: number;
}) {
    const [liked, setLike] = useState(isLiked);
    const [user, setUser] = useUser();
    const [users, setUsers] = useUsers();

    const userFound = useMemo(
        () => users.find((u) => u.id === authorId),
        [users]
    );

    const { likeComment, deleteComment } = usePostAction();

    return (
        <div>
            <div className="flex w-full md:gap-2 p-4 border-y border-white/20">
                <Avatar
                    size="md"
                    avatar={userFound?.avatar || null}
                    username={userFound!.username}
                />
                <div className="rounded mx-2 w-full ">
                    <div className="flex items-start justify-between ">
                        <div className="flex flex-col">
                            <p className="!text-[12px] md:text-sm text-white/60">
                                Replying to{' '}
                                <span className="text-purple-600 font-semibold">
                                    @{userFound!.username}
                                </span>
                            </p>
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
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteComment(
                                        id,
                                        postId,
                                        authorId,
                                        postAuthorId
                                    );
                                }}
                                className="flex gap-2 items-center cursor-pointer transition-all hover:bg-red-500/20 px-2 py-1"
                            >
                                {user ? (
                                    <>
                                        <IconTrash className="text-red-500" />
                                        <p className="text-sm">Delete</p>
                                    </>
                                ) : (
                                    <>
                                        <IconReport className="text-red-500" />
                                        <p className="text-sm">Report</p>
                                    </>
                                )}
                            </button>
                        </Dropdown>
                    </div>
                    <div className="mb-6">
                        <p className="text-white/90 text-sm">{content}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() =>
                                likeComment(liked, setLike, id, postId)
                            }
                            className="flex gap-2 items-center"
                        >
                            <IconHeart
                                className={`${
                                    liked
                                        ? 'fill-red-500 stroke-transparent'
                                        : 'stroke-white'
                                } w-4 h-4 md:w-5 md:h-5`}
                            />
                            <span className="font-semibold text-[12px] md:text-sm">
                                {likes}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
