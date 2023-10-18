import { useRouter } from 'next/router';

import { users } from '@/mock/user';
import { usePosts, useUser } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import MainSection from '@/components/User/MainSection';
import PostCommentCard from '@/components/Post/PostCommentCard';
import CommentCard from '@/components/Post/CommentCard';

export default function PostPage() {
    const { query } = useRouter();

    const username = query.username;
    const postId = query.postId as string;

    const [user, setUser] = useUser();
    const [post, setPost] = usePosts();

    const userFound = users.find((user) => user.username === username);
    const postFound = post.find(
        (p) => p!.id.toString() === postId && userFound!.id === p!.userId
    );

    return user ? (
        <UserProfile
            user={{
                username: userFound!.username,
                name: userFound!.username,
                bio: userFound?.bio,
                avatar: userFound!.avatar || null,
            }}
        >
            <MainSection title="Post">
                <div className=" flex flex-col gap-4">
                    {postFound ? (
                        <PostCard
                            key={postFound.id}
                            id={postFound.id}
                            userId={postFound.userId}
                            content={postFound.content}
                            isLiked={postFound.liked}
                            count={{
                                likes: postFound.likes,
                                comments: postFound.comments?.length || 0,
                            }}
                        >
                            <>
                                <PostCommentCard
                                    id={postFound.id}
                                    username={userFound!.username}
                                />
                                {postFound?.comments?.map((comment) => (
                                    <CommentCard
                                        key={comment.id}
                                        authorId={comment.userId}
                                        postId={postFound.id}
                                        postAuthorId={postFound.userId}
                                        id={comment.id}
                                        content={comment.content}
                                        isLiked={comment.liked}
                                        likes={comment.likes}
                                    />
                                ))}
                            </>
                        </PostCard>
                    ) : (
                        <>No Post!</>
                    )}
                </div>
            </MainSection>
        </UserProfile>
    ) : (
        <>404 - user not found</>
    );
}

PostPage.layout = 'user';
