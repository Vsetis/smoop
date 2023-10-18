import CreatePost from '@/components/Post/CreatePost';
import PostCard from '@/components/Post/PostCard';
import MainSection from '@/components/User/MainSection';
import UserProfile from '@/components/UserProfile';
import { posts } from '@/mock/posts';
import { useUser } from '@/utils/atom';

export default function Home() {
    const [user, setUser] = useUser();

    const postQuery = posts.filter((p) => p.userId !== user!.id);

    return (
        <UserProfile user={user!}>
            <div className="border border-white/20 rounded p-4 mb-4">
                <CreatePost avatar={user!.avatar} username={user!.username} />
            </div>
            <MainSection title="Home">
                <div className="flex flex-col">
                    {postQuery.map((post) => (
                        <PostCard
                            id={post.id}
                            userId={post.userId}
                            content={post.content}
                            isLiked={post.liked}
                            count={{
                                likes: post.likes,
                                comments: post.comments?.length || 0,
                            }}
                        />
                    ))}
                </div>
            </MainSection>
        </UserProfile>
    );
}
Home.layout = 'user';
