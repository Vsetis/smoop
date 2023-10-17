export const posts = [
    {
        id: 1,
        userId: 1,
        content: 'This is first post!',
        liked: false,
        likes: 0,
        comments: [
            {
                id: 1,
                userId: 2,
                content: 'Nice post!',
                replies: [
                    {
                        id: 4,
                        userId: 1,
                        content: 'Thanks!',
                    },
                ],
            },
            {
                id: 2,
                userId: 3,
                content: 'Rlly nice!',
            },
        ],
    },
    {
        id: 2,
        userId: 3,
        content: 'This is my First Post!',
        liked: false,
        likes: 0,
        comments: [
            {
                id: 3,
                userId: 1,
                content: 'I like it!',
            },
        ],
    },
];
