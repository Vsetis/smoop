import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import { posts } from '@/mock/posts';
import { session } from '@/mock/session';
import { users } from '@/mock/user';
import { usePosts } from '@/utils/atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function UserPage() {
    const { query } = useRouter();
    const username = query.username;

    const user = users.find((user) => user.username === username);

    const postQuery = posts
        .map((p) => p)
        .filter((p) => p.author.username === username);

    const [post, setPost] = usePosts();

    useEffect(() => {
        setPost(postQuery);
    }, [username]);

    const addLike = (id: number) => {
        const updatePosts = post.map((post) => {
            if (post.id === id) {
                return { ...post, liked: true, likes: post.likes + 1 };
            }
            return post;
        });
        setPost(updatePosts);
    };

    const removeLike = (id: number) => {
        const updatePosts = post.map((post) => {
            if (post.id === id) {
                return { ...post, liked: false, likes: post.likes - 1 };
            }
            return post;
        });
        setPost(updatePosts);
    };

    const deletePost = (id: number, author: string) => {
        if (author === session!.user!.username) {
            const updatePosts = post.filter((p) => p.id !== id);
            setPost(updatePosts);
        } else {
            console.log('error');
        }
    };

    return user ? (
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
                    <h2 className="font-semibold text-white/80">Posts</h2>
                </div>
                <div className=" flex flex-col p-4 gap-4">
                    {post.length > 0 ? (
                        post
                            .map((p) => (
                                <PostCard
                                    key={p.id}
                                    id={p.id}
                                    user={{
                                        username: p!.author.username,
                                        name: p!.author.name,
                                        avatar: p!.author.avatar,
                                    }}
                                    content={p.content}
                                    likes={p.likes}
                                    isLiked={p.liked}
                                    click={() =>
                                        p.liked
                                            ? removeLike(p.id)
                                            : addLike(p.id)
                                    }
                                    postDelete={() =>
                                        deletePost(p.id, p.author.username)
                                    }
                                    router={true}
                                />
                            ))
                            .reverse()
                    ) : (
                        <>
                            <div className="flex items-center justify-center min-h-[400px]">
                                <p>This user hasn't post yet</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </UserProfile>
    ) : (
        <>404 - user not found</>
    );
}

UserPage.layout = 'user';
