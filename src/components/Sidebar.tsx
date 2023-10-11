import { notifications } from '@/mock/user';
import {
    IconBell,
    IconHome2,
    IconSettings,
    IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';

const links = [
    { label: 'Home', target: '/home', icon: IconHome2 },
    { label: 'Profile', target: '/profile', icon: IconUser },
    { label: 'Notifications', target: '/notifications', icon: IconBell },
    { label: 'Settings', target: '/settings', icon: IconSettings },
];

export default function Sidebar() {
    return (
        <>
            <div className="h-screen border-r border-white/20 justify top-0 left-0 min-w-[220px] py-4 flex flex-col justify-between">
                <div>
                    <div className="border-b border-white/20 pb-4 px-4">
                        <img
                            className="w-6 h-6"
                            src="/logo.svg"
                            alt="Smoop Social Network"
                        />
                    </div>
                    <div className="mt-8">
                        {links.map((link) => (
                            <Link
                                className="flex font-semibold text-white/80 items-center px-4 gap-6 w-full transition-all hover:bg-white/5 py-3"
                                href={link.target}
                            >
                                <div className="relative rounded p-1.5 bg-purple-800/20">
                                    {link.label === 'Notifications' &&
                                        !!notifications && (
                                            <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0 translate-x-[8px] translate-y-[-8px] animate-pulse" />
                                        )}
                                    <link.icon className="w-5 h-5 text-purple-500" />
                                </div>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
