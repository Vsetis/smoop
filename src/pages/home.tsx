import CreatePost from '@/components/Post/CreatePost';
import UserProfile from '@/components/UserProfile';
import { useUser } from '@/utils/atom';

export default function Home() {
    const [user, setUser] = useUser();

    return (
        <UserProfile user={user}>
            <div className="flex flex-col gap-4 w-full">
                <div className="border border-white/20 rounded p-4">
                    <CreatePost
                        avatar={user!.avatar}
                        username={user!.username}
                    />
                </div>
                <div className="rounded border border-white/20 w-full">
                    <div className="p-4 border-b border-white/20 mb-4">
                        <h2 className="font-semibold text-white/80">Home</h2>
                    </div>
                    <div className=" flex flex-col p-4 gap-4">
                        <div className="flex items-center justify-center min-h-[200px]">
                            <p className="font-semibold text-xl text-white/80">
                                Nothing New
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </UserProfile>
    );
}
Home.layout = 'user';
