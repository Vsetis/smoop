import { User } from '@/types';
import Image from 'next/image';

export default function ProfileCard({ user }: { user: User }) {
    return (
        <div className="min-w-[400px] w-max flex flex-col items-center h-max p-4 border border-white/20 rounded">
            {!!user.avatar ? (
                <Image
                    width={32}
                    height={32}
                    className="rounded-full mb-2"
                    src={user.avatar}
                    alt={`${user.username} profile avatar`}
                ></Image>
            ) : (
                <div className="mb-2 rounded-full w-16 h-16 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
            )}
            <h3 className="mb-1 text-xl font-semibold text-white/80">
                {user.username}
            </h3>
            <p className="mb-4 font-semibold text-sm text-white/60">
                @{user.name}
            </p>
            {user.bio && <p className="mb-8 text-white/80">{user.bio}</p>}
            <div className="flex flex-row justify-center w-full">
                <div className="flex flex-col items-center justify-center px-4 w-32">
                    <p className="text-white/60">Posts</p>
                    <p className="font-semibold text-lg">2</p>
                </div>
                <div className="flex flex-col items-center justify-center w-32 border-x border-white/20">
                    <p className="text-white/60">Followers</p>
                    <p className="font-semibold text-lg">40k</p>
                </div>
                <div className="flex flex-col items-center justify-center px-4 w-32">
                    <p className="text-white/60">Following</p>
                    <p className="font-semibold text-lg">0</p>
                </div>
            </div>
        </div>
    );
}