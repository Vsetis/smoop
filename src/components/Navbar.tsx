import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSearch } from '@/hooks/useSearch';

import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Button from './UI/Button';
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
    const { getItems, setItems, removeItem } = useLocalStorage('value', []);

    const updatedHistory = users.filter((u) =>
        getItems().includes(u?.username)
    );

    const searchingArea = useRef<HTMLDivElement>(null);
    const [isSearching, setSearching] = useState(false);
    const [value, setValue] = useState('');
    const [history, setHistory] = useState<User[]>(updatedHistory);

    useSearch(searchingArea, setSearching);

    const searchQuery = users
        .filter((u) => (u!.username || u!.name).includes(value))
        .slice(0, 5);

    const handleRemove = (username: string) => {
        (e: React.MouseEvent) => {
            e.stopPropagation();
        };

        removeItem(username);
        setHistory([...history.filter((h) => h && h.username !== username)]);
    };

    const handleSearch = (s: {
        username: string;
        avatar?: string | null;
        name: string;
    }) => {
        push(`/${s.username}`);
        const items = getItems();

        if (!items.includes(s.username)) {
            items.push(s.username);
            setItems(items);

            setHistory([...history, s]);
        }
    };

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
                                searchQuery.map(
                                    (s) =>
                                        s && (
                                            <SearchCard
                                                key={s.id}
                                                avatar={s.avatar || null}
                                                username={s.username}
                                                name={s.name}
                                                onClick={() => handleSearch(s)}
                                            />
                                        )
                                )
                            ) : (
                                <div className="flex flex-col">
                                    {history.length > 0 ? (
                                        <>
                                            <p className="p-2 text-white/70 font-semibold text-sm">
                                                Recently searched
                                            </p>
                                            {history.map(
                                                (u) =>
                                                    u && (
                                                        <div
                                                            key={u.username}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <SearchCard
                                                                avatar={
                                                                    u.avatar ||
                                                                    null
                                                                }
                                                                username={
                                                                    u.username
                                                                }
                                                                name={u.name}
                                                                onClick={() => {
                                                                    push(
                                                                        `/${u.username}`
                                                                    );
                                                                }}
                                                            >
                                                                <Button
                                                                    transparent
                                                                    onClick={() =>
                                                                        handleRemove(
                                                                            u.username
                                                                        )
                                                                    }
                                                                >
                                                                    <IconX className="text-white/80 transition-all  hover:text-red-500/50 rounded" />
                                                                </Button>
                                                            </SearchCard>
                                                        </div>
                                                    )
                                            )}
                                        </>
                                    ) : (
                                        <p className="p-2 text-white/70 font-semibold text-sm">
                                            Try searching for people.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
