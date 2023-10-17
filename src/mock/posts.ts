export const posts = [
    {
        id: 1,
        userId: 1,
        content: 'This is first post!',
        liked: true,
        likes: 1,
        comments: [
            {
                id: 3,
                userId: 2,
                content: 'I like it!',
                liked: false,
                likes: 0,
            },
        ],
    },
    {
        id: 2,
        userId: 3,
        content: 'This is my First Post!',
        liked: false,
        likes: 0,
    },
    {
        id: 3,
        userId: 2,
        replying: 2,
        content: 'I like it!',
        liked: false,
        likes: 0,
    },
];
