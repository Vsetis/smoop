import Image from 'next/image';
export default function UserAvatar({
    avatar,
    username,
}: {
    avatar: string | null;
    username: string;
}) {
    return (
        <div>
            {!!avatar ? (
                <Image
                    width={32}
                    height={32}
                    className="rounded-full mb-2"
                    src={avatar}
                    alt={`${username} profile avatar`}
                ></Image>
            ) : (
                <div className="mb-2 rounded-full w-8 h-8 md:w-10 md:h-10 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
            )}
        </div>
    );
}
