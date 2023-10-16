import {
    IconBell,
    IconHome2,
    IconMessage,
    IconSearch,
    IconSettings,
    IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MobileNav() {
    const links = [
        { target: '/home', icon: IconHome2 },
        { target: '/search', icon: IconSearch },
        { target: '/notifications', icon: IconBell },
        { target: '/messages', icon: IconMessage },
    ];

    const [prevScroll, setScroll] = useState(0);
    const [visible, setVisible] = useState(true);

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
                } sticky w-full bg-black bottom-0 left-0 p-4 md:hidden transition-all`}
            >
                <div className="flex justify-between mx-4">
                    {links.map((link) => (
                        <Link key={link.target} href={link.target}>
                            <link.icon className="w-8 h-8" />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
