import { useUsers } from '@/utils/atom';

export default function Test() {
    const [users] = useUsers();
    return (
        <>
            {users.map((user) => (
                <p>{user?.username}</p>
            ))}
        </>
    );
}
