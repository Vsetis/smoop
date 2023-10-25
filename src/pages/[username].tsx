import { useRouter } from 'next/router';

import { usePosts, useUser, useUsers } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import MainSection from '@/components/User/MainSection';

export default function UserPage() {
    const { query } = useRouter();

    const [post] = usePosts();
    const [users] = useUsers();
    const [user] = useUser();

    const username = query.username;

    const userFind = users.find((user) => user?.username === username);
    const postQuery = post.filter((post) => post?.userId === userFind?.id);

    return !!userFind ? (
        <UserProfile user={userFind!} posts={postQuery.length || 0}>
            <MainSection title="Posts">
                {postQuery?.length > 0 ? (
                    <>
                        {postQuery &&
                            postQuery
                                .map(
                                    (p) =>
                                        p && (
                                            <PostCard
                                                key={p.id}
                                                id={p.id}
                                                userId={userFind!.id}
                                                content={p.content}
                                                count={{
                                                    likes: p.likes,
                                                    comments:
                                                        p.comments?.length || 0,
                                                }}
                                                isLiked={p.liked}
                                                postRouter={true}
                                            />
                                        )
                                )
                                .reverse()}
                    </>
                ) : (
                    <>
                        <p className="p-5">
                            {userFind.username === user!.username
                                ? 'You do not have any post!'
                                : 'This user does not have any post!'}
                        </p>
                    </>
                )}
            </MainSection>
        </UserProfile>
    ) : (
        <>404 - user not found</>
    );
}

UserPage.layout = 'user';
