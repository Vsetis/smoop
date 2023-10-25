import { useUser, useUsers } from '@/utils/atom';
import Avatar from '../UI/Avatar';
import Link from 'next/link';
import Button from '../UI/Button';
import { useUserAction } from '@/hooks/useUserAction';

export default function FollowCard({
    userId,
    following,
}: {
    userId: string;
    following: boolean;
}) {
    const [user] = useUser();
    const [users] = useUsers();

    const { follow } = useUserAction(userId);

    const findUser = users.find((u) => u && u.id === userId);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar
                        size="md"
                        avatar={findUser!.avatar || null}
                        username={findUser!.username}
                    />
                    <div>
                        <Link
                            href={`/${findUser!.username}`}
                            className="font-semibold text-white/80 hover:underline"
                        >
                            {findUser!.username}
                        </Link>
                        <p className="text-[12px] text-white/60">
                            @{findUser!.name}
                        </p>
                    </div>
                </div>
                {user!.username !== findUser!.username && (
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
