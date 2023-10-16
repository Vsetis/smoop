import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

import { users } from '@/mock/user';
import { usePosts, useUser } from '@/utils/atom';
import { Post } from '@/types';

import PostCard from '@/components/Post/PostCard';
import UserProfile from '@/components/UserProfile';
import { IconArrowBack } from '@tabler/icons-react';

export default function PostPage() {
    const { query, push, back } = useRouter();

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

    const createPostAndReply = (postFound: Post) => {
        if (user && value !== '') {
            const newReply = {
                id: post.length + 1,
                author: user,
                content: value,
                liked: false,
                likes: 0,
            };

            const newPost = {
                id: post.length + 1,
                content: value,
                author: user,
                liked: false,
                likes: 0,
                replyPost: { ...postFound, replyPost: undefined },
            };

            const updatedReplies = postFound.replies
                ? [...postFound.replies]
                : [];

            updatedReplies.push(newReply);

            const updatedPost = {
                ...postFound,
                replies: updatedReplies,
            };

            const updatedPosts = post.map((p) => {
                if (p.id === updatedPost.id) {
                    return updatedPost;
                }
                return p;
            });

            setPost([...updatedPosts, newPost]);

            setValue('');
            setRyplying(false);
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
            <div className="rounded md:border border-white/20 w-full">
                <div className="p-2 md:p-4 border-b border-white/20 mb-4 flex items-center gap-8">
                    <button onClick={() => back()}>
                        <IconArrowBack className="text-white/80 transition-all hover:text-white" />
                    </button>
                    <h2 className="font-semibold text-white/80">Post</h2>
                </div>
                <div className=" flex flex-col p-2 md:p-4 gap-4">
                    {postFound ? (
                        <PostCard
                            id={postFound.id}
                            reply={postFound.replyPost?.author?.username}
                            user={{
                                username: postFound!.author!.username,
                                name: postFound!.author!.name,
                                avatar: postFound!.author!.avatar,
                            }}
                            content={postFound.content}
                            isLiked={postFound.liked}
                            count={{
                                likes: postFound.likes,
                                comments: postFound.replies?.length || 0,
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
                        >
                            <div
                                className={`${
                                    isReplying ? 'pt-2' : 'pt-4'
                                } border-t border-white/20  mt-4`}
                            >
                                <p
                                    className={
                                        isReplying
                                            ? 'mb-2 text-white/50 text-[12px] md:text-sm'
                                            : 'hidden'
                                    }
                                >
                                    Replying to {''}
                                    <span className="text-purple-600">
                                        @{postFound.author!.username}
                                    </span>
                                </p>
                                <div className="relative flex flex-col">
                                    <div className="flex gap-4 ">
                                        <div>
                                            {!!user.avatar ? (
                                                <Image
                                                    width={28}
                                                    height={28}
                                                    className="rounded-full md:w-9 md:h-9"
                                                    src={user.avatar}
                                                    alt={`${user.username} profile avatar`}
                                                ></Image>
                                            ) : (
                                                <div className=" rounded-full w-7 h-7 md:w-9 md:h-9 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                                            )}
                                        </div>

                                        <textarea
                                            onClick={() => setRyplying(true)}
                                            onChange={(e) =>
                                                setValue(e.target.value)
                                            }
                                            value={value}
                                            className="text-sm md:text-base w-full flex bg-transparent min-h-[50px] overflow-hidden resize-none focus:outline-none"
                                            placeholder="Reply"
                                            maxLength={280}
                                        ></textarea>
                                        <button
                                            disabled
                                            className={
                                                isReplying
                                                    ? 'hidden'
                                                    : 'bg-purple-900 text-white/50 font-semibold text-sm px-2 py-1 md:px-4 md:py-2  h-max w-max rounded'
                                            }
                                        >
                                            Reply
                                        </button>
                                    </div>
                                    <div className="flex justify-between border-b mb-8 border-white/20">
                                        <button
                                            onClick={() => {
                                                createPostAndReply(postFound);
                                            }}
                                            disabled={value === ''}
                                            className={`${
                                                isReplying ? '' : 'hidden'
                                            } ${
                                                value === ''
                                                    ? 'bg-purple-900 text-white/50'
                                                    : 'hover:bg-purple-600'
                                            } w-max bg-purple-700 font-semibold text-sm px-2 py-1 md:px-4 md:py-2 transition-all  h-max rounded ml-auto mb-4`}
                                        >
                                            Reply
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {postFound.replies?.map((r) => (
                                            <PostCard
                                                key={r.id}
                                                postRouter={true}
                                                id={r.id}
                                                user={r.author}
                                                content={r.content}
                                                isLiked={r.liked}
                                                click={() => {}}
                                                postDelete={() => {}}
                                                count={{
                                                    likes: r.likes,
                                                    comments:
                                                        r.replies?.length || 0,
                                                }}
                                            />
                                        ))}
                                    </div>
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
