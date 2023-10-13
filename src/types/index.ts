export type User = {
    username: string;
    name: string;
    bio?: string;
    avatar: string | null;
};

export type Post = {
    id: number;
    content: string;
    author: User;
    liked: boolean;
    likes: number;
    comments?: { id: number; content: string; author: User }[];
};
