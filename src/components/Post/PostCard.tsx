import Image from 'next/image';

import {
    IconDots,
    IconHeart,
    IconMessage,
    IconReport,
    IconShare,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User } from '@/types';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/atom';

export default function PostCard({
    user,
    content,
    isLiked,
    id,
    click,
    postDelete,
    children,
    router,
    count,
}: {
    id: number;
    user: User;
    content: string;
    isLiked: boolean;
    click: () => void;
    postDelete: () => void;
    children?: React.ReactNode;
    router?: boolean;
    count: { likes: number; comments: number };
}) {
    const [liked, setLike] = useState(isLiked);
    const [loggedUser, setUser] = useUser();

    const { push } = useRouter();

    return (
        <div
            onClick={() => {
                router === true && push(`/${user!.username}/posts/${id}`);
            }}
            className="flex w-full gap-4"
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
                    <div className="mb-2 rounded-full w-10 h-10 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                )}
            </div>
            <div
                className={`${
                    router === true && 'hover:bg-white/5 cursor-pointer'
                } rounded mx-2 w-full border p-4 border-white/20  transition-all `}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="text-lg text-white/80 font-semibold">
                            {user!.username}
                        </p>
                        <p className="text-sm text-white/60">@{user!.name}</p>
                    </div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <IconDots className="transition-all hover:text-white/80" />
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
                    <p className="text-white/90 ">{content}</p>
                </div>
                <div className="flex gap-8">
                    <button
                        onClick={(e) => {
                            click();
                            setLike(!liked);
                            e.stopPropagation();
                        }}
                        className="flex gap-2"
                    >
                        <IconHeart
                            className={
                                liked
                                    ? 'fill-red-500 stroke-transparent'
                                    : 'stroke-white'
                            }
                        />
                        <span className="font-semibold">{count.likes}</span>
                    </button>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex gap-2"
                    >
                        <IconMessage />
                        <span className="font-semibold">{count.comments}</span>
                    </button>
                    <button onClick={(e) => e.stopPropagation()}>
                        <IconShare />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
