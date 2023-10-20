import { useUser, useUsers } from '@/utils/atom';
import Avatar from '../UI/Avatar';
import Link from 'next/link';

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
    const [users, setUsers] = useUsers();

    const handleFollow = (userId: number) => {
        const follow = () => {
            if (user && users) {
                const followData = { userId };
                const updatedUser = {
                    ...user,
                    following: [...(user.following ?? []), followData],
                };
                setUser(updatedUser);

                const updatedUsers = users.map((u) => {
                    if (u.id === user.id) {
                        return updatedUser;
                    }
                    return u;
                });

                setUsers(updatedUsers);
            }
        };

        const unfollow = () => {
            if (user) {
                const updatedFollowing = user.following?.filter(
                    (f) => f.userId !== userId
                );
                const updatedUser = { ...user, following: updatedFollowing };
                setUser(updatedUser);

                const updatedUsers = users.map((u) => {
                    if (u.id === user.id) {
                        return updatedUser;
                    }
                    return u;
                });

                setUsers(updatedUsers);
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
                        <Link
                            href={`/${username}`}
                            className="font-semibold text-white/80 hover:underline"
                        >
                            {username}
                        </Link>
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
