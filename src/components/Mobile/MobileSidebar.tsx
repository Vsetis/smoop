import { useScroll } from '@/hooks/useScroll';
import { useUser } from '@/utils/atom';
import {
    IconLogout,
    IconMessage,
    IconSearch,
    IconSettings,
    IconUser,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const links = [
    { label: 'Profile', target: '/[username]', icon: IconUser },
    { label: 'Settings', target: '/settings', icon: IconSettings },
    { label: 'Search', target: '/search', icon: IconSearch },
    { label: 'Messages', target: '/messages', icon: IconMessage },
];

export default function MobileSidebar() {
    const [user, setUser] = useUser();
    const [visible, setVisible] = useState(true);
    const [open, setOpen] = useState(false);

    useScroll({ setVisible: setVisible });

    return (
        <>
            <div
                className={`${
                    visible ? 'translate-y-[0]' : 'translate-y-[-100%]'
                } sticky top-0 left-0 w-full bg-black z-[50] p-2 transition-all sm:hidden ${
                    open ? 'opacity-0' : ''
                }`}
            >
                {!!user!.avatar ? (
                    <Image
                        onClick={() => setOpen(true)}
                        width={32}
                        height={32}
                        className="rounded-full mb-2"
                        src={user!.avatar}
                        alt={`${user!.username} profile avatar`}
                    ></Image>
                ) : (
                    <div
                        onClick={() => setOpen(true)}
                        className="mb-2 rounded-full w-10 h-10 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800"
                    />
                )}
            </div>

            <div
                onClick={() => setOpen(false)}
                className={`${
                    open ? 'opacity-100' : 'opacity-0 hidden'
                } w-full h-full top-0 left-0 fixed z-40 bg-white/40 transition-all`}
            />
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                    open ? 'translate-x-[0]' : 'translate-x-[-100%]'
                } fixed h-full w-[70%] bg-black top-0 left-0 z-50 p-4 transition-all`}
            >
                <div>
                    <div className="flex items-center justify-between">
                        {!!user!.avatar ? (
                            <Image
                                onClick={() => setOpen(true)}
                                width={32}
                                height={32}
                                className="rounded-full mb-2"
                                src={user!.avatar}
                                alt={`${user!.username} profile avatar`}
                            ></Image>
                        ) : (
                            <div
                                onClick={() => setOpen(true)}
                                className="mb-2 rounded-full w-10 h-10 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800"
                            />
                        )}

                        <button onClick={() => setUser(null)}>
                            <IconLogout className="text-red-500" />
                        </button>
                    </div>
                    <p className="font-semibold text-white/80">
                        {user!.username}
                    </p>
                    <p className="text-white/60 text-sm mb-4">@{user!.name}</p>
                    <div className="flex gap-4 mb-8">
                        <p>
                            0{' '}
                            <span className="text-white/60 text-sm">
                                Followers
                            </span>
                        </p>
                        <p>
                            0{' '}
                            <span className="text-white/60 text-sm">
                                Following
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        {links.map((link) => (
                            <Link
                                onClick={() => setOpen(false)}
                                key={link.target}
                                className="flex items-center gap-4 text-xl font-semibold"
                                href={link.target.replace(
                                    '/[username]',
                                    `/${user!.username}`
                                )}
                            >
                                <link.icon className="w-8 h-8" />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
