import { useRouter } from 'next/router';

import { users } from '@/mock/user';
import { usePosts } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import MainSection from '@/components/User/MainSection';

export default function UserPage() {
    const { query } = useRouter();

    const [post, setPost] = usePosts();

    const username = query.username;

    const userQuery = users.find((user) => user.username === username);
    const postQuery = post.filter((post) => post.userId === userQuery!.id);

    return !!userQuery ? (
        <UserProfile
            user={{
                username: userQuery!.username,
                name: userQuery!.username,
                bio: userQuery?.bio,
                avatar: userQuery!.avatar || null,
            }}
        >
            <MainSection title="Posts">
                <div className=" flex flex-col gap-2 md:gap-4">
                    {postQuery?.length > 0 ? (
                        postQuery
                            .map((p) => (
                                <PostCard
                                    key={p.id}
                                    id={p.id}
                                    user={{
                                        username: userQuery.username,
                                        name: userQuery.name,
                                        avatar: userQuery.avatar,
                                    }}
                                    content={p.content}
                                    count={{
                                        likes: p.likes,
                                        comments: p.comments?.length || 0,
                                    }}
                                    isLiked={p.liked}
                                    postRouter={true}
                                />
                            ))
                            .reverse()
                    ) : (
                        <>
                            <p className="p-5">This user has not post yet</p>
                        </>
                    )}
                </div>
            </MainSection>
        </UserProfile>
    ) : (
        <>404 - user not found</>
    );
}

UserPage.layout = 'user';
