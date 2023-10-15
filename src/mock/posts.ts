export const posts = [
    {
        id: 1,
        author: { username: 'guest', name: 'guest', avatar: null },
        content: 'First Post',
        liked: false,
        likes: 6,
        replies: [
            {
                id: 7,
                author: { username: 'vsetik', name: 'vsetik', avatar: null },
                content: 'Replying to guest',
                liked: false,
                likes: 6,
            },
        ],
    },
    {
        id: 2,
        author: { username: 'guest', name: 'guest', avatar: null },
        content: 'Second Post',
        liked: true,
        likes: 1,
    },
    {
        id: 3,
        author: { username: 'guest', name: 'guest', avatar: null },
        content: 'Replying to Vsetik reply',
        liked: false,
        likes: 0,
        replyPost: {
            id: 7,
            author: { username: 'vsetik', name: 'vsetik', avatar: null },
            content: 'Replying to guest',
            liked: false,
            likes: 6,
        },
    },

    {
        id: 4,
        author: { username: 'vsetik', name: 'vsetik', avatar: null },
        content: 'First Post',
        liked: false,
        likes: 6,
    },
    {
        id: 5,
        author: { username: 'vsetik', name: 'vsetik', avatar: null },
        content: 'Second Post',
        liked: false,
        likes: 6,
    },
    {
        id: 6,
        author: { username: 'vsetik', name: 'vsetik', avatar: null },
        content: 'Third Post',
        liked: false,
        likes: 6,
    },
    {
        id: 7,
        author: { username: 'vsetik', name: 'vsetik', avatar: null },
        content: 'Replying to guest',
        replyPost: {
            id: 1,
            author: { username: 'guest', name: 'guest', avatar: null },
            content: 'First Post',
            liked: false,
            likes: 6,
        },
        liked: false,
        likes: 6,
        replies: [
            {
                id: 3,
                author: { username: 'guest', name: 'guest', avatar: null },
                content: 'Replying to Vsetik reply',
                liked: false,
                likes: 0,
            },
        ],
    },
];
