import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { User } from '@/types';
import { useUser } from '@/utils/atom';

import {
    IconDots,
    IconHeart,
    IconMessage,
    IconReport,
    IconShare,
    IconTrash,
} from '@tabler/icons-react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function PostCard({
    user,
    content,
    isLiked,
    id,
    click,
    postDelete,
    children,
    postRouter,
    count,
    reply,
}: {
    id: number;
    user: User;
    content: string;
    isLiked: boolean;
    click: () => void;
    postDelete: () => void;
    children?: React.ReactNode;
    postRouter?: boolean;
    reply?: string;
    count: { likes: number; comments: number };
}) {
    const [liked, setLike] = useState(isLiked);
    const [loggedUser, setUser] = useUser();

    const { push } = useRouter();

    return (
        <div
            onClick={() =>
                postRouter === true && push(`/${user!.username}/posts/${id}`)
            }
            className="flex w-full md:gap-2 border-b border-white/20 pb-4"
        >
            <div>
                {!!user!.avatar ? (
                    <Image
                        width={32}
                        height={32}
                        className="rounded-full mb-2"
                        src={user!.avatar}
                        alt={`${user!.username} profile avatar`}
                    ></Image>
                ) : (
                    <div className="mb-2 rounded-full w-8 h-8 md:w-10 md:h-10 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                )}
            </div>
            <div
                className={`${
                    postRouter === true && 'hover:bg-white/5 cursor-pointer'
                } rounded mx-2 w-full transition-all `}
            >
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
                                {user!.username}
                            </p>
                            <p className="!text-[12px] text-white/60">
                                @{user!.name}
                            </p>
                        </div>
                    </div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <IconDots className="transition-all text-white/80 hover:text-white" />
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                onClick={(e) => e.stopPropagation()}
                                className="w-max bg-zinc-800 rounded py-2 text-white/80"
                            >
                                <DropdownMenu.Item className="hover:outline-none">
                                    {loggedUser?.username === user?.username ? (
                                        <button
                                            onClick={() => postDelete()}
                                            className="text-sm font-semibold transition-all hover:bg-red-500/10 flex items-center gap-2 px-2 py-1 w-full"
                                        >
                                            <IconTrash className="text-red-500" />{' '}
                                            Delete
                                        </button>
                                    ) : (
                                        <button className="text-sm font-semibold transition-all hover:bg-red-500/10 flex items-center gap-2 px-2 py-1 w-full">
                                            <IconReport className="text-red-500" />{' '}
                                            Report
                                        </button>
                                    )}
                                </DropdownMenu.Item>

                                <DropdownMenu.Group>
                                    <DropdownMenu.Item />
                                </DropdownMenu.Group>

                                <DropdownMenu.CheckboxItem>
                                    <DropdownMenu.ItemIndicator />
                                </DropdownMenu.CheckboxItem>

                                <DropdownMenu.Sub>
                                    <DropdownMenu.SubTrigger />
                                    <DropdownMenu.Portal>
                                        <DropdownMenu.SubContent />
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Sub>

                                <DropdownMenu.Separator />
                                <DropdownMenu.Arrow />
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
                <div className="mb-6">
                    <p className="text-white/90 text-sm">{content}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={(e) => {
                            click();
                            setLike(!liked);
                            e.stopPropagation();
                        }}
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
                            {count.likes}
                        </span>
                    </button>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2"
                    >
                        <IconMessage className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-semibold text-[12px] md:text-sm">
                            {count.comments}
                        </span>
                    </button>
                    <button onClick={(e) => e.stopPropagation()}>
                        <IconShare className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
