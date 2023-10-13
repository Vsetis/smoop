import Image from 'next/image';
export default function CommentCard({
    id,
    avatar,
    username,
    name,
    last,
    content,
}: {
    id: number;
    avatar: string | null;
    username: string;
    name: string;
    last: boolean;
    content: string;
}) {
    return (
        <>
            <div className="translate-x-4 w-[1px] bg-white/20 h-[50px] top-0"></div>
            <div className="flex gap-4">
                <div>
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
                            {last ? null : (
                                <div className="translate-x-4 w-[1px] bg-white/20 min-h-[50px] top-0"></div>
                            )}
                        </>
                    )}
                </div>
                <div>
                    <div className="mb-2 flex gap-2 text-white/80 items-center h-max">
                        <p>{username}</p>
                        <p className="text-sm text-white/50">@{name}</p>
                    </div>
                    <p>{content}</p>
                </div>
            </div>
        </>
    );
}
