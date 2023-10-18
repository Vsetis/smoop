import Image from 'next/image';
export default function Avatar({
    avatar,
    username,
    size,
}: {
    avatar: string | null;
    username: string;
    size?: 'sm' | 'md' | 'xl';
}) {
    return (
        <div>
            <div
                className={
                    size === 'sm'
                        ? 'w-8 h-8'
                        : size === 'md'
                        ? 'w-12 h-12'
                        : size === 'xl'
                        ? 'w-16 h-16'
                        : ''
                }
            >
                {!!avatar ? (
                    <Image
                        width={100}
                        height={100}
                        className="rounded-full mb-2 w-full h-full"
                        src={avatar}
                        alt={`${username} profile avatar`}
                    ></Image>
                ) : (
                    <div className="mb-2 rounded-full w-full h-full  bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                )}
            </div>
        </div>
    );
}
