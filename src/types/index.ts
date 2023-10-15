export type User = {
    username: string;
    name: string;
    bio?: string;
    avatar: string | null;
} | null;

export type Post = {
    id: number;
    content: string;
    author: User;
    liked: boolean;
    likes: number;
    replies?: {
        id: number;
        author: User;
        content: string;
        liked: boolean;
        likes: number;
        replies?: {
            id: number;
            author: User;
            content: string;
            liked: boolean;
            likes: number;
        }[];
    }[];
    replyPost?: {
        id: number;
        author: User;
        content: string;
        liked: boolean;
        likes: number;
    };
};
