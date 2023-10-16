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
        <div className="flex flex-col md:flex-row gap-4 flex-grow flex-wrap w-full px-0 2xl:px-20">
            <div className="w-full md:w-1/2 xl:w-max grow md:grow-0">
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
            <div className="w-full xl:w-max grow order-3 xl:order-2">
                {children}
            </div>
            <div className="hidden md:flex order-2  xl:order-3 md:grow xl:grow-0 2xl:h-max xl:w-[27%]">
                <Sugestion />
            </div>
        </div>
    );
}
