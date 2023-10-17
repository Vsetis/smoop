import { useRouter } from 'next/router';

import { users } from '@/mock/user';
import { usePosts, useUser } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import MainSection from '@/components/User/MainSection';
import PostCommentCard from '@/components/Post/PostCommentCard';

export default function PostPage() {
    const { query } = useRouter();

    const username = query.username;
    const postId = query.postId as string;

    const [user, setUser] = useUser();
    const [post, setPost] = usePosts();

    const userFound = users.find((user) => user.username === username);
    const postFound = post.find(
        (p) => p.id.toString() === postId && userFound!.id === p!.userId
    );

    const findUser = (userId: number) => {
        const result = users.find((u) => u.id === userId);

        return result;
    };

    const postFind = (postId: number) => {
        const result = post!.find((p) => p.id === postId);

        return result;
    };

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
                            user={{
                                username: userFound!.username,
                                name: userFound!.name,
                                avatar: userFound!.avatar,
                            }}
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
                                    avatar={userFound!.avatar}
                                    username={userFound!.username}
                                />
                                {postFound.comments
                                    ?.map((comment) => (
                                        <PostCard
                                            reply={userFound!.username}
                                            key={comment.id}
                                            id={comment.id}
                                            user={{
                                                username: findUser(
                                                    comment.userId
                                                )!.username,
                                                name: findUser(comment.userId)!
                                                    .name,
                                                avatar: findUser(
                                                    comment.userId
                                                )!.avatar,
                                            }}
                                            content={comment.content}
                                            isLiked={comment.liked}
                                            count={{
                                                likes: comment.likes,
                                                comments:
                                                    postFind(comment.id)
                                                        ?.comments?.length || 0,
                                            }}
                                        />
                                    ))
                                    .reverse()}
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
