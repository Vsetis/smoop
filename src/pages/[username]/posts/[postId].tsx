import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { posts } from '@/mock/posts';
import { session } from '@/mock/session';
import { users } from '@/mock/user';

import { usePosts } from '@/utils/atom';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import CommentCard from '@/components/Post/CommentCard';

export default function PostPage() {
    const { query, push } = useRouter();

    const postId = query.postId as string;
    const username = query.username;

    const [post, setPost] = usePosts();

    const user = users.find((user) => user.username === query.username);

    const postQuery = posts
        .map((p) => p)
        .filter((p) => p.author.username === username);

    useEffect(() => {
        setPost(postQuery);
    }, [username]);

    const postFound = post.filter(
        (p) =>
            p.id.toString() === postId && query.username === p.author.username
    );

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
            push(`/${session!.user!.username}`);
        } else {
            console.log('error');
        }
    };

    const [isReplying, setRyplying] = useState(false);

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
                    <h2 className="font-semibold text-white/80">Post</h2>
                </div>
                <div className=" flex flex-col p-4 gap-4">
                    {postFound.length > 0 ? (
                        postFound.map((p) => (
                            <PostCard
                                key={p.id}
                                id={p.id}
                                user={{
                                    username: p!.author.username,
                                    name: p!.author.name,
                                    avatar: p!.author.avatar,
                                }}
                                content={p.content}
                                isLiked={p.liked}
                                count={{
                                    likes: p.likes,
                                    comments: p!.comments!.length || 0,
                                }}
                                click={() =>
                                    p.liked ? removeLike(p.id) : addLike(p.id)
                                }
                                postDelete={() =>
                                    deletePost(p.id, p.author.username)
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
                                            @{p.author.username}
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
                                                        {p.comments && (
                                                            <div className="translate-x-4 w-[1px] bg-white/20 h-[40px] top-0"></div>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            <textarea
                                                onClick={() =>
                                                    setRyplying(true)
                                                }
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
                                            {p.comments && (
                                                <div className="translate-x-4 w-[1px] bg-white/20 h-[40px] top-0"></div>
                                            )}
                                            <button
                                                className={`${
                                                    isReplying ? '' : 'hidden'
                                                } w-max bg-purple-700 font-semibold text-sm px-4 py-2 transition-all hover:bg-purple-600 h-max rounded`}
                                            >
                                                Reply
                                            </button>
                                        </div>
                                        {!!p.comments &&
                                            p.comments.map((comment) => (
                                                <CommentCard
                                                    id={comment.id}
                                                    avatar={
                                                        comment.author.avatar
                                                    }
                                                    username={
                                                        comment.author.username
                                                    }
                                                    name={comment.author.name}
                                                    last={
                                                        p.comments &&
                                                        p.comments[
                                                            p.comments.length -
                                                                1
                                                        ].id === comment.id
                                                            ? true
                                                            : false
                                                    }
                                                    content={comment.content}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </PostCard>
                        ))
                    ) : (
                        <>404 - no post</>
                    )}
                </div>
            </div>
        </UserProfile>
    ) : (
        <>404 - user not found</>
    );
}

PostPage.layout = 'user';
