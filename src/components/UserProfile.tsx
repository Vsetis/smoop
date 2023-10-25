import ProfileCard from './User/ProfileCard';
import Sugestion from './User/Sugestion';

export default function UserProfile({
    user,
    children,
    posts,
}: {
    user: {
        id: string;
        username: string;
        avatar?: string | null;
        name: string;
        bio?: string;
        following: { userId: string }[];
        followed: { userId: string }[];
    };
    posts: number;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 flex-grow flex-wrap w-full px-0 md:px-10 2xl:px-20">
            <div className="w-full md:w-1/2 2xl:w-max grow md:grow-0">
                {!!user && (
                    <ProfileCard
                        userId={user!.id}
                        username={user!.username}
                        name={user!.name}
                        bio={user?.bio}
                        avatar={user?.avatar || null}
                        posts={posts}
                        followed={user.followed}
                        following={user.following}
                    />
                )}
            </div>
            <div className="w-full xl:w-max grow order-3 2xl:order-2">
                {children}
            </div>
            <div className="hidden md:flex order-2  2xl:order-3 md:grow 2xl:grow-0 2xl:h-max xl:w-[27%]">
                <Sugestion />
            </div>
        </div>
    );
}
