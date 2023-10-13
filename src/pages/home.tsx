import UserProfile from '@/components/UserProfile';
import { session } from '@/mock/session';

const user = session.user;

export default function Home() {
    return (
        <UserProfile
            user={{
                username: user!.username,
                name: user!.username,
                bio: user?.bio,
                avatar: user!.avatar || null,
            }}
        >
            <div className="rounded border border-white/20 md:min-w-[600px]">
                <div className="p-4 border-b border-white/20 mb-4">
                    <h2 className="font-semibold text-white/80">Home</h2>
                </div>
                <div className=" flex flex-col p-4 gap-4">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <p>Home page</p>
                    </div>
                </div>
            </div>
        </UserProfile>
    );
}
Home.layout = 'user';
