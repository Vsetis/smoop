import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
    IconArrowBack,
    IconBell,
    IconHome2,
    IconMessage,
    IconPencilPlus,
    IconSearch,
} from '@tabler/icons-react';

import * as Dialog from '@radix-ui/react-dialog';
import CreatePost from '../Post/CreatePost';
import { useUser } from '@/utils/atom';

export default function MobileNav() {
    const links = [
        { target: '/home', icon: IconHome2 },
        { target: '/search', icon: IconSearch },
        { target: '/notifications', icon: IconBell },
        { target: '/messages', icon: IconMessage },
    ];

    const [prevScroll, setScroll] = useState(0);
    const [visible, setVisible] = useState(true);
    const [user, setUser] = useUser();
    const [open, setOpen] = useState(false);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setTimeout(() => {
            setVisible(true);

            if (currentScrollPos > prevScroll) {
                setVisible(false);
            } else {
            }
            setScroll(currentScrollPos);
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScroll]);

    return (
        <>
            <div
                className={`${
                    visible ? 'top-0' : 'opacity-30'
                } sticky w-full bg-black bottom-0 left-0 p-4 sm:hidden transition-all`}
            >
                <div className="flex justify-between mx-4">
                    {links.map((link) => (
                        <Link key={link.target} href={link.target}>
                            <link.icon className="w-8 h-8" />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="px-4 fixed bottom-8 right-4 z-[50]">
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger className="p-2 2xl:w-full bg-purple-700 rounded 2xl:py-1 font-semibold mb-8 transition-all hover:bg-purple-600">
                        <IconPencilPlus className="2xl:hidden w-8 h-8" />
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-black fixed inset-0 z-[50]" />
                        <Dialog.Content className="bg-black w-screen fixed z-[60] top-0 left-0 p-4 h-screen ">
                            <button className="w-max p-1 border border-white/20 rounded sm:hidden absolute top-4 left-4">
                                <IconArrowBack />
                            </button>
                            <div className="mt-16">
                                {user && (
                                    <CreatePost
                                        avatar={user.avatar || null}
                                        username={user.username}
                                    />
                                )}
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    );
}
