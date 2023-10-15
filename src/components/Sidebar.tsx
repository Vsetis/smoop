import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { notification } from '@/mock/notification';
import {
    IconBell,
    IconHome2,
    IconSettings,
    IconUser,
    IconLogout2,
} from '@tabler/icons-react';

import { User } from '@/types';

import * as Dialog from '@radix-ui/react-dialog';
import CreatePost from './Post/CreatePost';
import { useUser } from '@/utils/atom';

const links = [
    { label: 'Home', target: '/home', icon: IconHome2 },
    { label: 'Profile', target: '[username]', icon: IconUser },
    { label: 'Notifications', target: '/notifications', icon: IconBell },
    { label: 'Settings', target: '/settings', icon: IconSettings },
];

function ProfileCard({ user }: { user: User }) {
    const [hover, setHover] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between px-4">
                <div className="flex gap-4">
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
                    <div>
                        <p className="text-white/80 font-semibold">
                            {user!.username}
                        </p>
                        <p className="text-sm text-white/60">@{user!.name}</p>
                    </div>
                </div>

                <Link
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    href="/"
                    className="bg-red-500/20 rounded p-1 relative"
                >
                    <IconLogout2 className="text-red-500/70" />
                    <p
                        className={`${
                            hover ? 'flex' : 'hidden'
                        } absolute left-0 top-[2px] px-2 py-1 bg-zinc-800  rounded font-semibold text-sm translate-x-[42px]`}
                    >
                        Logout
                    </p>
                </Link>
            </div>
        </>
    );
}

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [loggedUser, setUser] = useUser();
    return (
        <div className="h-screen border-r border-white/20 top-0 left-0 min-w-[270px] pb-4 flex flex-col justify-between sticky z-50 bg-black">
            <div>
                <div className="border-b border-white/20 pb-4 px-4 h-[60px] pt-4">
                    <img
                        className="w-6 h-6"
                        src="/logo.svg"
                        alt="Smoop Social Network"
                    />
                </div>
                <div className="mt-8">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            className="flex font-semibold text-white/80 items-center px-4 gap-6 w-full transition-all hover:bg-white/5 py-3"
                            href={link.target.replace(
                                '[username]',
                                `/${loggedUser?.username}`
                            )}
                        >
                            <div className="relative rounded p-1.5 bg-purple-800/20">
                                {link.label === 'Notifications' &&
                                    !!notification && (
                                        <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0 translate-x-[8px] translate-y-[-8px] animate-pulse" />
                                    )}
                                <link.icon className="w-5 h-5 text-purple-500" />
                            </div>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <div className="px-4">
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger className=" w-full bg-purple-700 rounded py-1 font-semibold mb-8 transition-all hover:bg-purple-600">
                            New Post
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="bg-gray-700/50 fixed inset-0 z-[50]" />
                            <Dialog.Content className="bg-black min-w-[650px] rounded fixed top-[20%] left-1/2 z-[55] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[50px] max-h-[85vh] p-6">
                                {loggedUser && (
                                    <CreatePost
                                        avatar={loggedUser.avatar || null}
                                        username={loggedUser.username}
                                    />
                                )}
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <div className="border-t pt-8 border-white/20">
                    {loggedUser && <ProfileCard user={loggedUser} />}
                </div>
            </div>
        </div>
    );
}
