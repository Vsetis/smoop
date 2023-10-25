export const posts = [
    {
        id: 1,
        userId: 'b8522e8a-f7eb-41a7-81c9-6093a7fbb7b4',
        content: 'This is first post!',
        liked: false,
        likes: 1,
        comments: [
            {
                id: 1,
                userId: 'a599b6e0-65cb-4b01-9cf5-e7ce12a7a7d3',
                content: 'I like it!',
                liked: false,
                likes: 0,
            },
        ],
    },
    {
        id: 2,
        userId: 'e8c1e56e-e172-4cdb-baf4-09f2d791e6d1',
        content: 'This is my First Post!',
        liked: false,
        likes: 0,
    },
    {
        id: 3,
        userId: 'e8c1e56e-e172-4cdb-baf4-09f2d791e6d1',
        content: 'Just another day in paradise!',
        liked: true,
        likes: 3,
        comments: [
            {
                id: 2,
                userId: 'b8522e8a-f7eb-41a7-81c9-6093a7fbb7b4',
                content: 'Looks amazing!',
                liked: false,
                likes: 1,
            },
        ],
    },
];
