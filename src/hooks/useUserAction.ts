import { User, useUser, useUsers } from '@/utils/atom';

export const useUserAction = (userId: string) => {
    const [users, setUsers] = useUsers();
    const [user, setUser] = useUser();

    const follow = (following: boolean) => {
        const follow = () => {
            console.log('follow');

            setUser({ ...user!, followed: [], following: [{ userId }] });
            setUsers(
                users.map((u) => ({
                    ...u!,
                    followed: [...(u?.followed ?? []), { userId: user!.id }],
                    following: [...(u?.following ?? [])],
                }))
            );
        };

        const unfollow = () => {
            console.log('unfollow');

            setUser({
                ...user!,
                followed: [...(user?.followed ?? [])],
                following:
                    user?.following.filter((f) => f.userId !== userId) ?? [],
            });
            setUsers(
                users.map((u) => ({
                    ...u!,
                    followed:
                        u?.followed.filter((f) => f.userId !== user!.id) ?? [],
                    following: [...(u?.following ?? [])],
                }))
            );
        };

        following ? unfollow() : follow();
    };

    return { follow };
};
