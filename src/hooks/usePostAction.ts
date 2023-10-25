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

            const newPost = {
                id: newPostId,
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
        postId: string,
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const helper = posts.find((p) => p && p.id === postId);
        const newCommentId = faker.string.uuid();
        const newComment = {
            id: newCommentId,
            userId: user!.id,
            content: value,
            liked: false,
            likes: 0,
        };

        const postFound = posts.find((post) => post && post.id === postId);

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
        id: string,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();

        const addLike = (id: string) => {
            const updatePosts = posts.map((post) => {
                if (post && post.id === id) {
                    return { ...post, liked: true, likes: post.likes + 1 };
                }
                return post;
            });

            setPosts(updatePosts);
        };

        const removeLike = (id: string) => {
            const updatePosts = posts.map((post) => {
                if (post && post.id === id) {
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
        commentId: string,
        postId: string
    ) => {
        const addLikeComment = (commentId: string, postId: string) => {
            const updatedPosts = posts.map((post) => {
                if (post && post.id === postId) {
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

        const removeLikeComment = (commentId: string, postId: string) => {
            const updatedPosts = posts.map((post) => {
                if (post && post.id === postId) {
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

    const deletePost = (id: string, authorId: string) => {
        if (authorId === user!.id) {
            const updatePosts = posts.filter((p) => p && p.id !== id);
            setPosts(updatePosts);
        } else {
            console.log('error');
        }
    };

    const deleteComment = (
        id: string,
        postId: string,
        userId: string,
        postAuthorId: string
    ) => {
        const updatedPosts = posts.map((post) => {
            if (post && post.id === postId) {
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
