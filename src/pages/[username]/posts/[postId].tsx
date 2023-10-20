import { useRouter } from 'next/router';

import { usePosts, useUser, useUsers } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import MainSection from '@/components/User/MainSection';

import CommentCard from '@/components/Post/CommentCard';
import CreateCommentCard from '@/components/Post/CreateCommentCard';

export default function PostPage() {
    const { query } = useRouter();

    const username = query.username;
    const postId = query.postId as string;

    const [user, setUser] = useUser();
    const [users, setUsers] = useUsers();
    const [post, setPost] = usePosts();

    const userFound = users.find((user) => user.username === username);
    const postFound = post.find(
        (p) => p!.id.toString() === postId && userFound!.id === p!.userId
    );
    const postLength = post.filter((p) => p.userId === userFound!.id);

    return user ? (
        <UserProfile user={userFound!} posts={postLength.length || 0}>
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
                                <CreateCommentCard
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
