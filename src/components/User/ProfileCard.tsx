import Image from 'next/image';
import Avatar from '../UI/Avatar';

export default function ProfileCard({
    avatar,
    username,
    name,
    bio,
}: {
    avatar: string | null;
    username: string;
    name: string;
    bio?: string;
}) {
    return (
        <div className="w-full flex flex-col items-center h-max p-4 border border-white/20 rounded">
            <Avatar size="xl" avatar={avatar} username={username} />
            <h3 className="mb-1 text-xl font-semibold text-white/80">
                {username}
            </h3>
            <p className="mb-4 font-semibold text-sm text-white/60">@{name}</p>
            {bio && <p className="mb-8 text-white/80">{bio}</p>}
            <div className="grid grid-cols-3 min-w-[280px]">
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-white/60">Posts</p>
                    <p className="font-semibold text-lg">2</p>
                </div>
                <div className="flex flex-col items-center justify-center border-x px-4 border-white/20">
                    <p className="text-white/60">Followers</p>
                    <p className="font-semibold text-lg">40k</p>
                </div>
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-white/60">Following</p>
                    <p className="font-semibold text-lg">0</p>
                </div>
            </div>
        </div>
    );
}
