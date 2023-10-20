import Image from 'next/image';
import Avatar from '../UI/Avatar';
import Modal from '../RadixUI/Modal';
import { SetStateAction, useState } from 'react';
import FollowCard from './FollowCard';
import { users } from '@/mock/user';

export default function ProfileCard({
    avatar,
    username,
    name,
    bio,
    following,
    followed,
    posts,
}: {
    avatar: string | null;
    username: string;
    name: string;
    bio?: string;
    following?: { userId: number }[];
    followed?: { userId: number }[];
    posts: number;
}) {
    const [followingOpen, setFollowingOpen] = useState(false);
    const [followedOpen, setFollowedOpen] = useState(false);

    const followingQuery = following?.map((f) => f.userId);
    const followedQuery = followed?.map((f) => f.userId);

    const followingUsers = users.filter(
        (u) => followingQuery && followingQuery.includes(u.id)
    );
    const followedUsers = users.filter(
        (u) => followedQuery && followedQuery.includes(u.id)
    );

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
                    <p className="font-semibold text-lg">{posts}</p>
                </div>
                <div className="flex flex-col items-center justify-center border-x px-4 border-white/20">
                    <p className="text-white/60">Followers</p>
                    <Modal
                        title="Follow you"
                        open={followedOpen}
                        setOpen={setFollowedOpen}
                        triggerButton={
                            <p className="font-semibold text-lg">
                                {followed?.length || 0}
                            </p>
                        }
                    >
                        <div className="flex flex-col gap-4 ">
                            {followedUsers.map((u) => {
                                const isFollowing = followingUsers.some(
                                    (f) => f.id === u.id
                                );
                                return (
                                    <FollowCard
                                        key={u.id}
                                        userId={u.id}
                                        following={isFollowing}
                                        username={u.username}
                                        avatar={u.avatar || null}
                                        name={u.name}
                                    />
                                );
                            })}
                        </div>
                    </Modal>
                </div>
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-white/60">Following</p>
                    <Modal
                        title="You following"
                        open={followingOpen}
                        setOpen={setFollowingOpen}
                        triggerButton={
                            <p className="font-semibold text-lg">
                                {following?.length || 0}
                            </p>
                        }
                    >
                        <div className="flex flex-col gap-4">
                            {followingUsers.map((u) => (
                                <FollowCard
                                    key={u.id}
                                    userId={u.id}
                                    following={!!u}
                                    username={u.username}
                                    avatar={u.avatar || null}
                                    name={u.name}
                                />
                            ))}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
