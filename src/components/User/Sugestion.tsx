import Image from 'next/image';
import { useUser } from '@/utils/atom';
import { users } from '@/mock/user';

function SugestionUserCard({
    username,
    avatar,
    name,
}: {
    username: string;
    avatar: string | null;
    name: string;
}) {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {!!avatar ? (
                        <Image
                            width={32}
                            height={32}
                            className="rounded-full mb-2"
                            src={avatar}
                            alt={`${username} profile avatar`}
                        ></Image>
                    ) : (
                        <div className="mb-2 rounded-full w-8 h-8 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                    )}
                    <div>
                        <p className="font-semibold text-white/80">
                            {username}
                        </p>
                        <p className="text-[12px] text-white/60">@{name}</p>
                    </div>
                </div>
                <button className="px-4 py-1 border border-purple-700 text-sm font-semibold rounded transition-all hover:bg-purple-700/20 text-white/80 hover:text-white">
                    Follow
                </button>
            </div>
        </>
    );
}

export default function Sugestion() {
    const [user, setUser] = useUser();

    const suggestionQuery = users.filter((u) => u.username !== user!.username);

    const shuffledArray = (
        array: {
            id: number;
            username: string;
            name: string;
            bio?: string;
            email: string;
            avatar: string | null;
        }[],
        numberOfItems: number
    ) => {
        const randomArr = array.slice().sort(() => 0.5 - Math.random());
        return randomArr.slice(0, numberOfItems);
    };

    const suggestion = shuffledArray(suggestionQuery, 5);

    return (
        <div className="border border-white/20 rounded p-4 w-full">
            <p className="text-white/80 font-semibold text-xl mb-8">
                Who to follow
            </p>
            <div className="flex flex-col gap-4">
                {suggestion.map((user) => (
                    <SugestionUserCard
                        key={user.id}
                        username={user.username}
                        avatar={user.avatar}
                        name={user.name}
                    />
                ))}
            </div>
        </div>
    );
}
