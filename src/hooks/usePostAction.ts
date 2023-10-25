import { usePosts, useUser } from '@/utils/atom';
import { faker } from '@faker-js/faker';

export const usePostAction = () => {
    const [posts, setPosts] = usePosts();
    const [user, setUser] = useUser();

    const createPost = (
        postValue: string,
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        if (user && postValue !== '') {
            const newPostId = faker.string.uuid();

            setPosts([
                ...posts,
                {
                    id: newPostId,
                    userId: user.id,
                    content: postValue,
                    liked: false,
                    likes: 0,
                },
            ]);
            setValue('');
        }
    };

    const createComment = (
        postId: string,
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const newCommentId = faker.string.uuid();

        const postFound = posts.find((post) => post && post.id === postId);

        if (postFound) {
            postFound.comments = postFound.comments || [];

            setPosts((prevPosts) => {
                return prevPosts.map((post) => {
                    if (post?.id === postId) {
                        return {
                            ...post,
                            comments: [
                                ...(post?.comments ?? []),
                                {
                                    id: newCommentId,
                                    userId: user!.id,
                                    content: value,
                                    liked: false,
                                    likes: 0,
                                },
                            ],
                        };
                    }
                    return post;
                });
            });

            setValue('');
        }
    };

    const likePost = (
        liked: boolean,
        setLiked: React.Dispatch<React.SetStateAction<boolean>>,
        id: string,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();

        const addLike = (id: string) => {
            setPosts(
                posts.map((post) => {
                    if (post && post.id === id) {
                        return { ...post, liked: true, likes: post.likes + 1 };
                    }
                    return post;
                })
            );
        };

        const removeLike = (id: string) => {
            setPosts(
                posts.map((post) => {
                    if (post && post.id === id) {
                        return { ...post, liked: false, likes: post.likes - 1 };
                    }
                    return post;
                })
            );
        };

        liked ? removeLike(id) : addLike(id);
        setLiked(!liked);
    };

    const likeComment = (
        liked: boolean,
        setLiked: React.Dispatch<React.SetStateAction<boolean>>,
        commentId: string,
        postId: string
    ) => {
        const addLikeComment = (commentId: string, postId: string) => {
            setPosts((prevPosts) => {
                return prevPosts.map((post) => {
                    if (post?.id === postId) {
                        const updatedComments = (post.comments || []).map(
                            (comment) => {
                                if (comment.id === commentId) {
                                    return {
                                        ...comment,
                                        liked: true,
                                        likes: comment.likes + 1,
                                    };
                                }
                                return comment;
                            }
                        );

                        return { ...post, comments: updatedComments };
                    }
                    return post;
                });
            });
        };

        const removeLikeComment = (commentId: string, postId: string) => {
            setPosts((prevPosts) => {
                return prevPosts.map((post) => {
                    if (post?.id === postId) {
                        const updatedComments = (post.comments || []).map(
                            (comment) => {
                                if (comment.id === commentId) {
                                    return {
                                        ...comment,
                                        liked: false,
                                        likes: comment.likes - 1,
                                    };
                                }
                                return comment;
                            }
                        );

                        return { ...post, comments: updatedComments };
                    }
                    return post;
                });
            });
        };

        liked
            ? removeLikeComment(commentId, postId)
            : addLikeComment(commentId, postId);
        setLiked(!liked);
    };

    const deletePost = (id: string, authorId: string) => {
        setPosts(posts.filter((p) => authorId === p?.userId && p?.id !== id));
    };

    const deleteComment = (
        id: string,
        postId: string,
        userId: string,
        postAuthorId: string
    ) => {
        setPosts((prevPosts) => {
            return prevPosts.map((post) => {
                if (
                    post?.id === postId &&
                    (userId || postAuthorId === user!.id)
                ) {
                    const updatedComments = (post.comments || []).filter(
                        (comment) => comment.id !== id
                    );
                    return { ...post, comments: updatedComments };
                }
                return post;
            });
        });
    };

    return {
        createPost,
        createComment,
        likePost,
        likeComment,
        deletePost,
        deleteComment,
    };
};
