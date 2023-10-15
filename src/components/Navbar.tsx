import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { users } from '@/mock/user';

function SearchCard({
    avatar,
    username,
    name,
    onClick,
}: {
    avatar: string | null;
    username: string;
    name: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="w-full flex hover:bg-white/5 p-4 cursor-pointer"
        >
            <div className="flex gap-4 items-center ">
                {!!avatar ? (
                    <Image
                        width={36}
                        height={36}
                        className="rounded-full"
                        src={avatar}
                        alt={`${username} profile avatar`}
                    ></Image>
                ) : (
                    <>
                        <div className=" rounded-full w-9 h-9 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                    </>
                )}
                <div>
                    <p className="font-semibold text-white/60">{username}</p>
                    <p className="text-sm text-white/40">@{name}</p>
                </div>
            </div>
        </div>
    );
}

export default function Navbar() {
    const { push } = useRouter();

    const searchingArea = useRef<HTMLDivElement>(null);
    const [isSearching, setSearching] = useState(false);

    const [value, setValue] = useState('');

    const searchQuery = users.filter((u) =>
        (u.username || u.name).includes(value)
    );

    useEffect(() => {
        function Search(e: MouseEvent) {
            const target = e.target as Node;

            if (!searchingArea.current?.contains(target)) {
                setSearching(false);
            }
        }

        document.addEventListener('mousedown', Search);

        return () => document.removeEventListener('mousedown', Search);
    }, []);

    return (
        <>
            <div className="bg-black/80 backdrop-blur-sm  w-full sticky top-0 left-0 z-20 h-[60px]  border-b border-white/20">
                <div className="container mx-auto flex justify-end h-full  py-2">
                    <div ref={searchingArea} className="w-[20%] ">
                        <input
                            onFocus={() => setSearching(true)}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            className="w-full h-full bg-transparent border border-white/20 rounded focus:outline-none focus:border-white/40 px-2 text-white/60"
                            type="text"
                            placeholder="...search"
                        />
                        <div
                            className={`${
                                isSearching ? 'visible' : 'hidden'
                            } bg-black rounded border border-white/20 mt-2`}
                        >
                            <div className="flex flex-col">
                                {value !== '' ? (
                                    searchQuery.length > 0 ? (
                                        searchQuery.map((u) => (
                                            <SearchCard
                                                onClick={() => {
                                                    push(`/${u.username}`);
                                                    setValue('');
                                                    setSearching(false);
                                                }}
                                                key={u.username}
                                                avatar={u.avatar}
                                                username={u.username}
                                                name={u.name}
                                            />
                                        ))
                                    ) : (
                                        <p className="p-4 text-white/50">
                                            User with this name does not exist!
                                        </p>
                                    )
                                ) : (
                                    <p className="p-4 text-white/50">
                                        Try searching for people
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
