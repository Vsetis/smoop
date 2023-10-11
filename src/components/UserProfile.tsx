import { User } from '@/types';
import ProfileCard from './User/ProfileCard';
import Sugestion from './User/Sugestion';

export default function UserProfile({
    user,
    children,
}: {
    user: User;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-8 md:flex-row flex-wrap flex-grow">
            <ProfileCard
                user={{
                    username: user!.username,
                    name: user!.name,
                    bio: user?.bio,
                    avatar: user?.avatar || null,
                }}
            />
            <div className="order-3 xl:order-2 grow">{children}</div>
            <div className="order-2 grow ">
                <Sugestion />
            </div>
        </div>
    );
}
