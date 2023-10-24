import Avatar from '../UI/Avatar';
import Modal from '../RadixUI/Modal';
import { useState } from 'react';
import FollowCard from './FollowCard';
import { useUser, useUsers } from '@/utils/atom';
import { IconEdit } from '@tabler/icons-react';

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
    const [user, setUser] = useUser();
    const [users, setUsers] = useUsers();
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

    const myFollowingList = user?.following?.map((u) => u.userId);

    const showNames = users.filter((u) => myFollowingList?.includes(u.id));

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
                            {followedUsers.length ? (
                                followedUsers.map((u) => {
                                    const isFollowing = showNames.some(
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
                                })
                            ) : (
                                <p className="pt-2 text-lg text-white/80">
                                    0 Followers
                                </p>
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
                            {followingUsers.length ? (
                                followingUsers.map((u) => {
                                    const isFollowing = showNames.some(
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
                                })
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
