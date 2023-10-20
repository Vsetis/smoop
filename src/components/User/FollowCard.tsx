import { useUser } from '@/utils/atom';
import Avatar from '../UI/Avatar';

export default function FollowCard({
    userId,
    username,
    avatar,
    name,
    following,
}: {
    userId: number;
    username: string;
    avatar: string | null;
    name: string;
    following: boolean;
}) {
    const [user, setUser] = useUser();

    const handleFollow = (userId: number) => {
        const follow = () => {
            if (user) {
                const follow = { userId };
                const updateUser = {
                    ...user,
                    following: [...(user.following ?? []), follow],
                };

                setUser(updateUser);
            }
        };

        const unfollow = () => {
            if (user) {
                const updatedUser = user!.following?.filter(
                    (f) => f.userId !== userId
                );

                const newUser = { ...user, following: updatedUser };

                setUser(newUser);
            }
        };

        following ? unfollow() : follow();
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar size="md" avatar={avatar} username={username} />
                    <div>
                        <p className="font-semibold text-white/80">
                            {username}
                        </p>
                        <p className="text-[12px] text-white/60">@{name}</p>
                    </div>
                </div>
                {user!.username !== username && (
                    <button
                        onClick={() => handleFollow(userId)}
                        className="px-4 py-1 border border-purple-700 text-sm font-semibold rounded transition-all hover:bg-purple-700/20 text-white/80 hover:text-white"
                    >
                        {following ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>
        </>
    );
}