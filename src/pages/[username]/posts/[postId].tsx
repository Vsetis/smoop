import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

import { users } from '@/mock/user';

import { usePosts, useUser } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import CommentCard from '@/components/Post/CommentCard';

export default function PostPage() {
    const { query, push } = useRouter();

    const username = query.username;
    const postId = query.postId as string;

    const [user, setUser] = useUser();

    const userFound = users.find((user) => user.username === username);

    const [post, setPost] = usePosts();

    const postFound = post.find(
        (p) => p.id.toString() === postId && username === p!.author!.username
    );

    const [value, setValue] = useState('');
    const [isReplying, setRyplying] = useState(false);

    const addComment = (postId: number) => {
        const updatedPosts = post.map((post) => {
            if (post.id === postId && !!user) {
                const newComment = {
                    id: post.comments?.filter(
                        (p) => p.id === post.comments?.length
                    )
                        ? post.comments?.length + 1
                        : 1,
                    author: user,
                    content: value,
                };
                const comments = post.comments || [];
                return { ...post, comments: [...comments, newComment] };
            }
            return post;
        });
        setPost(updatedPosts);
        setValue('');
    };

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
            push(`/${user!.username}`);
        } else {
            console.log('error');
        }
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
            <div className="rounded border border-white/20 md:min-w-[600px]">
                <div className="p-4 border-b border-white/20 mb-4">
                    <h2 className="font-semibold text-white/80">Post</h2>
                </div>
                <div className=" flex flex-col p-4 gap-4">
                    {postFound ? (
                        <PostCard
                            id={postFound.id}
                            user={{
                                username: postFound!.author!.username,
                                name: postFound!.author!.name,
                                avatar: postFound!.author!.avatar,
                            }}
                            content={postFound.content}
                            isLiked={postFound.liked}
                            count={{
                                likes: postFound.likes,
                                comments: postFound.comments?.length || 0,
                            }}
                            click={() =>
                                postFound.liked
                                    ? removeLike(postFound.id)
                                    : addLike(postFound.id)
                            }
                            postDelete={() =>
                                deletePost(
                                    postFound.id,
                                    postFound.author!.username
                                )
                            }
                            router={false}
                        >
                            <div
                                className={`${
                                    isReplying ? 'pt-2' : 'pt-4'
                                } border-t border-white/20  mt-4`}
                            >
                                <p
                                    className={
                                        isReplying
                                            ? 'mb-2 text-white/50 text-sm'
                                            : 'hidden'
                                    }
                                >
                                    Replying to{' '}
                                    <span className="text-purple-600">
                                        @{postFound.author!.username}
                                    </span>
                                </p>
                                <div className="relative flex flex-col">
                                    <div className="flex gap-4 ">
                                        <div>
                                            {!!user.avatar ? (
                                                <Image
                                                    width={36}
                                                    height={36}
                                                    className="rounded-full"
                                                    src={user.avatar}
                                                    alt={`${user.username} profile avatar`}
                                                ></Image>
                                            ) : (
                                                <>
                                                    <div className=" rounded-full w-9 h-9 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                                                    {postFound.comments && (
                                                        <div className="translate-x-4 w-[1px] bg-white/20 h-[40px] top-0"></div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <textarea
                                            onClick={() => setRyplying(true)}
                                            onChange={(e) =>
                                                setValue(e.target.value)
                                            }
                                            value={value}
                                            className="w-full flex bg-transparent min-h-[75px] overflow-auto resize-none focus:outline-none"
                                            placeholder="Reply"
                                            maxLength={280}
                                        ></textarea>
                                        <button
                                            disabled
                                            className={
                                                isReplying
                                                    ? 'hidden'
                                                    : 'bg-purple-900 text-white/50 font-semibold text-sm px-4 py-2  h-max w-max rounded'
                                            }
                                        >
                                            Reply
                                        </button>
                                    </div>
                                    <div className="flex justify-between">
                                        {postFound.comments && (
                                            <div className="translate-x-4 w-[1px] bg-white/20 min-h-[50px] top-0"></div>
                                        )}
                                        <button
                                            onClick={() =>
                                                addComment(postFound.id)
                                            }
                                            disabled={value === ''}
                                            className={`${
                                                isReplying ? '' : 'hidden'
                                            } ${
                                                value === ''
                                                    ? 'bg-purple-900 text-white/50'
                                                    : 'hover:bg-purple-600'
                                            } w-max bg-purple-700 font-semibold text-sm px-4 py-2 transition-all  h-max rounded ml-auto`}
                                        >
                                            Reply
                                        </button>
                                    </div>
                                    {!!postFound.comments ? (
                                        postFound.comments
                                            .map((comment) => (
                                                <CommentCard
                                                    key={comment.id}
                                                    id={comment.id}
                                                    avatar={
                                                        comment?.author
                                                            ?.avatar || null
                                                    }
                                                    username={
                                                        comment!.author!
                                                            .username
                                                    }
                                                    name={comment!.author!.name}
                                                    last={
                                                        postFound.comments?.[0]
                                                            .id === comment.id
                                                            ? true
                                                            : false
                                                    }
                                                    content={comment.content}
                                                />
                                            ))
                                            .reverse()
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </PostCard>
                    ) : (
                        <>No Post!</>
                    )}
                </div>
            </div>
        </UserProfile>
    ) : (
        <>404 - user not found</>
    );
}

PostPage.layout = 'user';
