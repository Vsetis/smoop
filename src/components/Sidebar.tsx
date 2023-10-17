import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import {
    IconBell,
    IconHome2,
    IconSettings,
    IconUser,
    IconLogout2,
    IconPencilPlus,
} from '@tabler/icons-react';

import { notification } from '@/mock/notification';
import { useUser } from '@/utils/atom';

import CreatePost from './Post/CreatePost';
import Modal from './RadixUI/Modal';

const links = [
    { label: 'Home', target: '/home', icon: IconHome2 },
    { label: 'Profile', target: '[username]', icon: IconUser },
    { label: 'Notifications', target: '/notifications', icon: IconBell },
    { label: 'Settings', target: '/settings', icon: IconSettings },
];

function SidebarUserCard({
    avatar,
    username,
    name,
}: {
    avatar: string | null;
    username: string;
    name: string;
}) {
    const [hover, setHover] = useState(false);
    const [loggedUser, setUser] = useUser();
    return (
        <>
            <div className="flex items-center justify-between px-4">
                <div className="flex gap-4">
                    {!!avatar ? (
                        <Image
                            width={32}
                            height={32}
                            className="rounded-full mb-2"
                            src={avatar}
                            alt={`${username} profile avatar`}
                        ></Image>
                    ) : (
                        <div className="mb-2 rounded-full w-10 h-10 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                    )}
                    <div className="hidden 2xl:flex flex-col">
                        <p className="text-white/80 font-semibold ">
                            {username}
                        </p>
                        <p className="text-sm text-white/60">@{name}</p>
                    </div>
                </div>
                <button
                    className="relative py-1 hidden 2xl:flex"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => setUser(null)}
                >
                    <IconLogout2 className="text-red-500/70" />
                    <p
                        className={`${
                            hover ? 'flex' : 'hidden'
                        } absolute left-0 top-[2px] px-2 py-1 bg-zinc-800  rounded font-semibold text-sm translate-x-[32px]`}
                    >
                        Logout
                    </p>
                </button>
            </div>
        </>
    );
}

function SidebarLink({
    label,
    target,
    username,
    icon,
}: {
    label: string;
    target: string;
    username: string;
    icon: React.ReactNode;
}) {
    const [hover, setHover] = useState(false);
    return (
        <>
            <Link
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                key={label}
                className="flex relative font-semibold text-white/80 items-center px-4 gap-6 w-full transition-all hover:bg-white/5 py-3"
                href={target.replace('[username]', `/${username}`)}
            >
                <div className="relative rounded p-1.5 bg-purple-800/20">
                    {label === 'Notifications' && !!notification && (
                        <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0 translate-x-[8px] translate-y-[-8px] animate-pulse" />
                    )}
                    {icon}
                    <span
                        className={`${
                            hover ? 'flex 2xl:hidden' : 'hidden'
                        } absolute left-0 top-[2px] px-2 py-1 bg-zinc-800  rounded font-semibold text-sm translate-x-[42px]`}
                    >
                        {label}
                    </span>
                </div>
                <span className="hidden 2xl:flex">{label}</span>
            </Link>
        </>
    );
}

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [loggedUser, setUser] = useUser();

    return (
        <div className="h-screen border-r border-white/20 top-0 left-0 2xl:min-w-[300px] pb-4 hidden sm:flex flex-col justify-between sticky z-50 bg-black">
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
                        <SidebarLink
                            key={link.label}
                            label={link.label}
                            target={link.target}
                            username={loggedUser!.username}
                            icon={
                                <link.icon className="w-8 h-8 text-purple-500" />
                            }
                        ></SidebarLink>
                    ))}
                </div>
            </div>
            <div>
                <div className="px-4">
                    <Modal
                        open={open}
                        setOpen={setOpen}
                        triggerButton={
                            <>
                                <button className="h-max bg-purple-800 text-white/80 hover:text-white font-semibold  w-full rounded mx-auto transition-all hover:bg-purple-700 p-2 2xl:py-2">
                                    <span className="hidden 2xl:flex justify-center">
                                        New Post
                                    </span>
                                    <IconPencilPlus className="2xl:hidden w-8 h-8" />
                                </button>
                            </>
                        }
                    >
                        <CreatePost avatar={null} username={'vsetik'} />
                    </Modal>
                </div>
                <div className="border-t pt-8 border-white/20 mt-8">
                    {loggedUser && (
                        <SidebarUserCard
                            avatar={loggedUser.avatar}
                            username={loggedUser.username}
                            name={loggedUser.name}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
