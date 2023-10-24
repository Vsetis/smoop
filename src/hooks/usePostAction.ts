import { usePosts, useUser } from '@/utils/atom';

export const usePostAction = () => {
    const [posts, setPosts] = usePosts();
    const [user, setUser] = useUser();

    const createPost = (
        postValue: string,
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        if (user && postValue !== '') {
            const newPost = {
                id: posts.length + 1,
                userId: user.id,
                content: postValue,
                liked: false,
                likes: 0,
            };

            setPosts([...posts, newPost]);
            setValue('');
        }
    };

    const createComment = (
        postId: number,
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const helper = posts.find((p) => p.id === postId);

        const newComment = {
            id: helper?.comments ? helper?.comments.length + 1 : 1,
            userId: user!.id,
            content: value,
            liked: false,
            likes: 0,
        };

        const postFound = posts.find((post) => post.id === postId);

        if (postFound) {
            postFound.comments = postFound.comments || [];
            postFound.comments.push(newComment);
            setPosts([...posts]);

            setValue('');
        }
    };

    const likePost = (
        liked: boolean,
        setLiked: React.Dispatch<React.SetStateAction<boolean>>,
        id: number,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();

        const addLike = (id: number) => {
            const updatePosts = posts.map((post) => {
                if (post.id === id) {
                    return { ...post, liked: true, likes: post.likes + 1 };
                }
                return post;
            });

            setPosts(updatePosts);
        };

        const removeLike = (id: number) => {
            const updatePosts = posts.map((post) => {
                if (post.id === id) {
                    return { ...post, liked: false, likes: post.likes - 1 };
                }
                return post;
            });

            setPosts(updatePosts);
        };

        liked ? removeLike(id) : addLike(id);
        setLiked(!liked);
    };

    const likeComment = (
        liked: boolean,
        setLiked: React.Dispatch<React.SetStateAction<boolean>>,
        commentId: number,
        postId: number
    ) => {
        const addLikeComment = (commentId: number, postId: number) => {
            const updatedPosts = posts.map((post) => {
                if (post.id === postId) {
                    const updatedComments = post.comments?.map((comment) => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                liked: true,
                                likes: comment.likes + 1,
                            };
                        }
                        return comment;
                    });

                    return {
                        ...post,
                        comments: updatedComments,
                    };
                }
                return post;
            });

            setPosts(updatedPosts);
        };

        const removeLikeComment = (commentId: number, postId: number) => {
            const updatedPosts = posts.map((post) => {
                if (post.id === postId) {
                    const updatedComments = post.comments?.map((comment) => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                liked: false,
                                likes: comment.likes - 1,
                            };
                        }
                        return comment;
                    });

                    return {
                        ...post,
                        comments: updatedComments,
                    };
                }
                return post;
            });

            setPosts(updatedPosts);
        };

        liked
            ? removeLikeComment(commentId, postId)
            : addLikeComment(commentId, postId);
        setLiked(!liked);
    };

    const deletePost = (id: number, authorId: number) => {
        if (authorId === user!.id) {
            const updatePosts = posts.filter((p) => p.id !== id);
            setPosts(updatePosts);
        } else {
            console.log('error');
        }
    };

    const deleteComment = (
        id: number,
        postId: number,
        userId: number,
        postAuthorId: number
    ) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                const updatedComments = post.comments?.filter((comment) => {
                    return comment.id !== id;
                });

                if (updatedComments?.length !== post.comments?.length) {
                    return {
                        ...post,
                        comments: updatedComments,
                    };
                }
            }
            return post;
        });

        (user!.id === userId || postAuthorId === user!.id) &&
            setPosts(updatedPosts);
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
