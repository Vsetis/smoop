import { usePosts } from '@/utils/atom';

export const usePostAction = (username: string) => {
    const [posts, setPosts] = usePosts();

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

    const deletePost = (id: number, author: string) => {
        if (author === username) {
            const updatePosts = posts.filter((p) => p.id !== id);
            setPosts(updatePosts);
        } else {
            console.log('error');
        }
    };

    return { addLike, removeLike, deletePost };
};
