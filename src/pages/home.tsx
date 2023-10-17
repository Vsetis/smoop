import CreatePost from '@/components/Post/CreatePost';
import MainSection from '@/components/User/MainSection';
import UserProfile from '@/components/UserProfile';
import { useUser } from '@/utils/atom';

export default function Home() {
    const [user, setUser] = useUser();

    return (
        <UserProfile user={user!}>
            <div className="border border-white/20 rounded p-4 mb-4">
                <CreatePost avatar={user!.avatar} username={user!.username} />
            </div>
            <MainSection title="Home">
                <div className="border-t border-white/20">
                    <p className="p-5 text-white/60">Nothing new!</p>
                </div>
            </MainSection>
        </UserProfile>
    );
}
Home.layout = 'user';
