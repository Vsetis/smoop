import { useUser, useUsers } from '@/utils/atom';
import FollowCard from './FollowCard';

export default function Sugestion() {
    const [user, setUser] = useUser();
    const [users] = useUsers();

    const followingQuery = user?.following?.map((f) => f.userId);

    const isFollowing = users.filter(
        (u) => followingQuery && followingQuery.includes(u.id)
    );

    const suggestedQuery = users
        .filter(
            (u) =>
                u.id !== user?.id &&
                !isFollowing.some((f) => f.username === u.username)
        )
        .slice(0, 7);

    return (
        <div className="border border-white/20 rounded p-4 w-full">
            <p className="text-white/80 font-semibold mb-4 text-lg">
                Who to follow
            </p>
            <div className="flex flex-col gap-4">
                {suggestedQuery.map((user) => (
                    <FollowCard
                        key={user.id}
                        userId={user.id}
                        username={user.username}
                        avatar={user.avatar || null}
                        name={user.name}
                        following={false}
                    />
                ))}
            </div>
        </div>
    );
}
