import Avatar from '@/components/UI/Avatar';
import { users } from '@/mock/user';
import { useNotification } from '@/utils/atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function NotificationCard({
    userId,
    postId,
    follow,
    like,
}: {
    userId: number;
    postId?: number;
    follow?: boolean;
    like?: boolean;
}) {
    const findUser = users.find((user) => user.id === userId);
    const { push } = useRouter();
    return (
        <div
            onClick={() => postId && push(`/guest/posts/${postId}`)}
            className="flex items-center justify-between  border border-white/20 p-4 transition-all hover:bg-white/5 cursor-pointer"
        >
            <div className="flex items-center gap-8">
                <div className="flex gap-4 items-center">
                    <Avatar
                        size="md"
                        avatar={findUser!.avatar || null}
                        username={findUser!.username}
                    />
                    <div>
                        <p className="font-semibold">{findUser!.username}</p>
                        <p className="text-sm text-white/70">
                            @{findUser!.name}
                        </p>
                    </div>
                </div>
                <p className="text-lg">
                    {follow
                        ? 'is following you!'
                        : like
                        ? 'liked your post!'
                        : ''}
                </p>
            </div>
            {follow && (
                <button className="px-4 py-1 border border-purple-800 rounded text-white/80 font-semibold transition-all hover:bg-purple-700/20 hover:text-white">
                    Follow
                </button>
            )}
        </div>
    );
}

export default function NotificationPage() {
    const [notification, setNotification] = useNotification();

    useEffect(() => {
        const updatedNotification = notification.map((n) => ({
            ...n,
            seen: true,
        }));

        setNotification(updatedNotification);
    }, []);

    return (
        <div className="h-screen">
            <div className="p-4 border border-white/20 w-full">
                <h1 className="text-xl font-semibold text-white/80">
                    Notifications
                </h1>
            </div>
            <div className="md:w-1/2">
                {!!notification &&
                    notification.map((n) => (
                        <NotificationCard
                            key={n.id}
                            postId={n.postId}
                            userId={n.userId}
                            like={n.like}
                            follow={n.follow}
                        />
                    ))}
            </div>
        </div>
    );
}

NotificationPage.layout = 'app';
