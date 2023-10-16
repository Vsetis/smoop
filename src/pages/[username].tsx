import { useRouter } from 'next/router';

import { users } from '@/mock/user';
import { usePosts, useUser } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';

export default function UserPage() {
    const { query } = useRouter();
    const username = query.username;

    const [user, setUser] = useUser();
    const userFound = users.find((user) => user.username === username);

    const [post, setPost] = usePosts();

    const postQuery = post.filter((p) => p.author!.username === username);

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
        if (author === user!.username) {
            const updatePosts = post.filter((p) => p.id !== id);
            setPost(updatePosts);
        } else {
            console.log('error');
        }
    };

    return !!userFound ? (
        <UserProfile
            user={{
                username: userFound!.username,
                name: userFound!.username,
                bio: userFound?.bio,
                avatar: userFound!.avatar || null,
            }}
        >
            <div className="rounded md:border border-white/20 w-full min-h-[210px]">
                <div className="p-2 md:p-4 border-b border-white/20 mb-4">
                    <h2 className="font-semibold text-white/80">Posts</h2>
                </div>
                <div className=" flex flex-col p-2 md:p-4 gap-2 md:gap-4">
                    {postQuery?.length > 0 ? (
                        postQuery
                            .map((p) => (
                                <PostCard
                                    reply={p.replyPost?.author!.username}
                                    key={p.id}
                                    id={p.id}
                                    user={{
                                        username: p.author!.username,
                                        name: p.author!.name,
                                        avatar: p.author!.avatar,
                                    }}
                                    content={p.content}
                                    count={{
                                        likes: p.likes,
                                        comments: p.replies?.length || 0,
                                    }}
                                    isLiked={p.liked}
                                    click={() =>
                                        p.liked
                                            ? removeLike(p.id)
                                            : addLike(p.id)
                                    }
                                    postDelete={() =>
                                        deletePost(p.id, p.author!.username)
                                    }
                                    postRouter={true}
                                />
                            ))
                            .reverse()
                    ) : (
                        <>
                            <p>This user has not post yet</p>
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
