import { useUser, useUsers } from '@/utils/atom';

export const useUserAction = (userId: string) => {
    const [users, setUsers] = useUsers();
    const [user, setUser] = useUser();

    const follow = (following: boolean) => {
        const follow = () => {
            if (user && users) {
                const followData = { userId };
                const followedData = { userId: user!.id };

                const updatedUser = {
                    ...user,
                    following: [...(user.following ?? []), followData],
                };

                setUser(updatedUser);

                const updatedUsers = users.map((u) => {
                    if (u!.id === userId) {
                        return {
                            ...u,
                            followed: [...(u?.followed ?? []), followedData],
                        };
                    }
                    return u;
                });

                setUsers(updatedUsers);
            }
        };

        const unfollow = () => {
            if (user && users) {
                const updatedFollowing = user.following?.filter(
                    (f) => f.userId !== userId
                );
                const updatedUser = {
                    ...user,
                    following: updatedFollowing,
                };
                setUser(updatedUser);

                const updatedUsers = users.map((u) => {
                    const updatedFollowed = u!.followed?.filter(
                        (f) => f.userId !== user.id
                    );

                    if (u!.id === userId) {
                        return {
                            ...u,
                            followed: updatedFollowed,
                        };
                    }
                    return u;
                });
                setUsers(updatedUsers);
            }
        };

        following ? unfollow() : follow();
    };

    return { follow };
};
