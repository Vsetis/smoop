import { useUser, useUsers } from '@/utils/atom';
import Avatar from '../UI/Avatar';
import Link from 'next/link';
import Button from '../UI/Button';
import { useUserAction } from '@/hooks/useUserAction';

export default function FollowCard({
    userId,
    username,
    avatar,
    name,
    following,
}: {
    userId: string;
    username: string;
    avatar: string | null;
    name: string;
    following: boolean;
}) {
    const [user, setUser] = useUser();
    const [users, setUsers] = useUsers();

    const { follow } = useUserAction(userId);

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
                    <>
                        <Button
                            outline
                            onClick={() => follow(following)}
                            size="xs"
                        >
                            {following ? 'Unfollow' : 'Follow'}
                        </Button>
                    </>
                )}
            </div>
        </>
    );
}
