import CreatePost from '@/components/Post/CreatePost';
import PostCard from '@/components/Post/PostCard';
import MainSection from '@/components/User/MainSection';
import UserProfile from '@/components/UserProfile';

import { usePosts, useUser } from '@/utils/atom';

export default function Home() {
    const [user, setUser] = useUser();
    const [posts, setPosts] = usePosts();

    const postQuery = posts.filter((p) => p.userId !== user!.id);

    return (
        <UserProfile user={user!}>
            <div className="border border-white/20 rounded p-4 mb-4">
                <CreatePost avatar={user!.avatar} username={user!.username} />
            </div>
            <MainSection title="Home">
                <div className="flex flex-col">
                    {postQuery
                        .map((post) => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                userId={post.userId}
                                content={post.content}
                                isLiked={post.liked}
                                postRouter={true}
                                count={{
                                    likes: post.likes,
                                    comments: post.comments?.length || 0,
                                }}
                            />
                        ))
                        .reverse()}
                </div>
            </MainSection>
        </UserProfile>
    );
}
Home.layout = 'user';
