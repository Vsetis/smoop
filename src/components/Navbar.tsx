import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useUsers } from '@/utils/atom';

type User = {
    username: string;
    name: string;
    avatar?: string | null;
} | null;

function SearchCard({
    avatar,
    username,
    name,
    onClick,
    children,
}: {
    avatar: string | null;
    username: string;
    name: string;
    onClick: () => void;
    children?: React.ReactNode;
}) {
    return (
        <div
            onClick={onClick}
            className="w-full flex justify-between items-center hover:bg-white/5 cursor-pointer px-4 py-2"
        >
            <div className="flex gap-4 items-center ">
                <div>
                    {!!avatar ? (
                        <Image
                            width={30}
                            height={30}
                            className="rounded-full"
                            src={avatar}
                            alt={`${username} profile avatar`}
                        ></Image>
                    ) : (
                        <>
                            <div className=" rounded-full w-[30px] h-[30px] bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                        </>
                    )}
                </div>
                <div>
                    <p className="font-semibold text-white/60 text-sm">
                        {username}
                    </p>
                    <p className="text-[12px] text-white/40">@{name}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

export default function Navbar() {
    const [users] = useUsers();
    const { push } = useRouter();

    const searchingArea = useRef<HTMLDivElement>(null);
    const [isSearching, setSearching] = useState(false);
    const [value, setValue] = useState('');

    useSearch(searchingArea, setSearching);

    const searchQuery = users
        .filter((u) => u && u.username.includes(value))
        .slice(0, 7);

    return (
        <>
            <div className="bg-black/80 backdrop-blur-sm  w-full sticky top-0 left-0 z-20 h-[60px]  border-b border-white/20 hidden md:flex flex-col">
                <div className="container mx-auto flex justify-end h-full  py-2 px-4 2xl:px-20">
                    <div
                        ref={searchingArea}
                        className="w-1/2 xl:w-1/3 2xl:w-[25%] "
                    >
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
                            {value !== '' ? (
                                searchQuery.length > 0 ? (
                                    searchQuery.map(
                                        (user: User) =>
                                            user && (
                                                <SearchCard
                                                    key={user.username}
                                                    avatar={null}
                                                    username={user.username}
                                                    name={user.name}
                                                    onClick={() =>
                                                        push(
                                                            `/${user.username}`
                                                        )
                                                    }
                                                />
                                            )
                                    )
                                ) : (
                                    <p className="p-4 text-white/80">
                                        User not found!
                                    </p>
                                )
                            ) : (
                                <p className="p-4 text-white/80">
                                    Try search for some people!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
