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
import { session } from '@/mock/session';

export default function PostCard({
    user,
    content,
    isLiked,
    likes,
    id,
    click,
    postDelete,
}: {
    id: number;
    user: User;
    content: string;
    isLiked: boolean;
    likes: number;
    click: () => void;
    postDelete: () => void;
}) {
    const [liked, setLike] = useState(isLiked);

    return (
        <>
            <div className="flex w-full gap-4">
                <div>
                    {!!user.avatar ? (
                        <Image
                            width={32}
                            height={32}
                            className="rounded-full mb-2"
                            src={user.avatar}
                            alt={`${user.username} profile avatar`}
                        ></Image>
                    ) : (
                        <div className="mb-2 rounded-full w-10 h-10 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                    )}
                </div>
                <div className="rounded mx-2 w-full border p-4 border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-lg text-white/80 font-semibold">
                                {user.username}
                            </p>
                            <p className="text-sm text-white/60">
                                @{user.name}
                            </p>
                        </div>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <IconDots className="transition-all hover:text-white/80" />
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content className="w-max bg-zinc-800 rounded py-2 text-white/80">
                                    <DropdownMenu.Item className="hover:outline-none">
                                        {session?.user?.username ===
                                        user.username ? (
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
                            onClick={() => {
                                click();
                                setLike(!liked);
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
                            <span className="font-semibold">{likes}</span>
                        </button>
                        <button className="flex gap-2">
                            <IconMessage />
                            <span className="font-semibold">0</span>
                        </button>
                        <button>
                            <IconShare />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
