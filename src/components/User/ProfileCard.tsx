import Avatar from '../UI/Avatar';
import Modal from '../RadixUI/Modal';
import { useState } from 'react';
import FollowCard from './FollowCard';
import { useUser } from '@/utils/atom';
import { IconEdit } from '@tabler/icons-react';
import Button from '../UI/Button';
import { useUserAction } from '@/hooks/useUserAction';

export default function ProfileCard({
    userId,
    avatar,
    username,
    name,
    bio,
    following,
    followed,
    posts,
}: {
    userId: string;
    avatar: string | null;
    username: string;
    name: string;
    bio?: string;
    following: { userId: string }[];
    followed: { userId: string }[];
    posts: number;
}) {
    const [user] = useUser();
    const [followingOpen, setFollowingOpen] = useState(false);
    const [followedOpen, setFollowedOpen] = useState(false);

    const { follow } = useUserAction(userId);

    const isFollowing = user?.following.find((u) => {
        if (u.userId === userId) {
            return u ? true : false;
        }
    });

    return (
        <div className="w-full flex flex-col items-center justify-between h-max p-4 border border-white/20 rounded min-h-[250px]">
            {user!.username === username && (
                <button className="flex ml-auto text-purple-600">
                    <IconEdit />
                </button>
            )}
            <div className="flex flex-col items-center">
                <div className="mb-1">
                    <Avatar size="xl" avatar={avatar} username={username} />
                </div>
                <p className="mb-1 text-xl font-semibold text-white/80">
                    {username}
                </p>
                <p className="mb-4 font-semibold text-sm text-white/60">
                    @{name}
                </p>
                {user!.username !== username && (
                    <div className="mb-4">
                        <Button
                            onClick={() => follow(isFollowing ? true : false)}
                            outline
                            size="sm"
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    </div>
                )}
                {bio && <p className="mb-8 text-white/80">{bio}</p>}
            </div>
            <div className="grid grid-cols-3 min-w-[280px]">
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-white/60">Posts</p>
                    <p className="font-semibold text-lg">{posts}</p>
                </div>
                <div className="flex flex-col items-center justify-center border-x px-4 border-white/20">
                    <p className="text-white/60">Followers</p>
                    <Modal
                        title="Followers"
                        open={followedOpen}
                        setOpen={setFollowedOpen}
                        triggerButton={
                            <button className="font-semibold text-lg">
                                {followed?.length || 0}
                            </button>
                        }
                    >
                        <div className="flex flex-col gap-4 ">
                            {followed.map(
                                (f) =>
                                    f && (
                                        <FollowCard
                                            key={f.userId}
                                            userId={f.userId}
                                            following={
                                                isFollowing ? true : false
                                            }
                                        />
                                    )
                            )}
                        </div>
                    </Modal>
                </div>
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-white/60">Following</p>
                    <Modal
                        title="Following"
                        open={followingOpen}
                        setOpen={setFollowingOpen}
                        triggerButton={
                            <button className="font-semibold text-lg">
                                {following?.length || 0}
                            </button>
                        }
                    >
                        <div className="flex flex-col gap-4">
                            {following.length > 0 ? (
                                following.map((f) => (
                                    <FollowCard
                                        key={f.userId}
                                        userId={f.userId}
                                        following={true}
                                    />
                                ))
                            ) : (
                                <p className="pt-2 text-lg text-white/80">
                                    0 Followers
                                </p>
                            )}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
