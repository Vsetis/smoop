import { useUser, useUsers } from '@/utils/atom';

export const useUserAction = (userId: string) => {
    const [users, setUsers] = useUsers();
    const [user, setUser] = useUser();

    const follow = (following: boolean) => {
        const follow = () => {
            setUser({
                ...user!,
                followed: [],
                following: [...(user?.following ?? []), { userId }],
            });

            setUsers((users) =>
                users.map((u) => {
                    if (u && u.id === user!.id) {
                        return {
                            ...u,
                            followed: [...(u.followed ?? [])],
                            following: [...(u.following ?? []), { userId }],
                        };
                    } else if (u && u.id === userId) {
                        return {
                            ...u,
                            followed: [
                                ...(u.followed ?? []),
                                { userId: user!.id },
                            ],
                            following: [...(u.following ?? [])],
                        };
                    }
                    return u;
                })
            );
        };

        const unfollow = () => {
            setUser({
                ...user!,
                followed: [...(user?.followed ?? [])],
                following:
                    user?.following.filter((f) => f.userId !== userId) ?? [],
            });
        };

        setUsers((users) =>
            users.map((u) => {
                if (u && u.id === user!.id) {
                    return {
                        ...u,
                        followed: [...(u.followed ?? [])],
                        following: u.following?.filter(
                            (f) => f.userId !== userId
                        ),
                    };
                } else if (u && u.id === userId) {
                    return {
                        ...u,
                        followed: u.followed?.filter(
                            (f) => f.userId !== user!.id
                        ),
                        following: [...(u.following ?? [])],
                    };
                }
                return u;
            })
        );

        following ? unfollow() : follow();
    };

    return { follow };
};
