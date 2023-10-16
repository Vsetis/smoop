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
        <div className="flex flex-col md:flex-row gap-4 flex-grow flex-wrap w-full">
            <div className="w-full md:w-max grow xl:grow-0">
                {!!user && (
                    <ProfileCard
                        user={{
                            username: user!.username,
                            name: user!.name,
                            bio: user?.bio,
                            avatar: user?.avatar || null,
                        }}
                    />
                )}
            </div>
            <div className="order-2 xl:order-3 grow xl:grow-0 hidden md:flex h-max">
                <Sugestion />
            </div>
            <div className="w-full xl:w-max order-3 xl:order-2 grow">
                {children}
            </div>
        </div>
    );
}
