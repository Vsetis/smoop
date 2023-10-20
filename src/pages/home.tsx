import CreatePost from '@/components/Post/CreatePost';
import PostCard from '@/components/Post/PostCard';
import MainSection from '@/components/User/MainSection';
import UserProfile from '@/components/UserProfile';
import { posts } from '@/mock/posts';

import { usePosts, useUser } from '@/utils/atom';

import { useEffect, useReducer } from 'react';

type State = {
    postPerPage: number;
    error: string | null;
};

type Action = {
    type: 'load';
};

function reducer(state: State, action: Action) {
    const { type } = action;

    switch (type) {
        case 'load': {
            const newLoad = state.postPerPage + 5;
            const hasError = newLoad > 50;
            return {
                ...state,
                postPerPage: hasError ? state.postPerPage : newLoad,
                error: hasError ? 'There is nothing new!' : null,
            };
        }
        default:
            return state;
    }
}

export default function Home() {
    const [user, setUser] = useUser();
    const [post, setPost] = usePosts();

    const [state, dispatch] = useReducer(reducer, {
        postPerPage: 5,
        error: null,
    });

    const postCount = post.filter((p) => p.userId === user?.id);

    const postQuery = post
        .filter((p) => p.userId !== user!.id)
        .slice(0, state.postPerPage);

    return (
        <UserProfile user={user!} posts={postCount.length || 0}>
            <div className="border border-white/20 rounded mb-4 p-4">
                <CreatePost
                    avatar={user?.avatar || null}
                    username={user!.username}
                />
            </div>
            <MainSection title="Home">
                <div>
                    {postQuery
                        .map((post) => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                userId={post.userId}
                                content={post.content}
                                isLiked={post.liked}
                                postRouter={true}
                                count={{
                                    likes: post.likes,
                                    comments: post.comments?.length || 0,
                                }}
                            />
                        ))
                        .reverse()}
                    {state.error ? (
                        <p>There is nothing new!</p>
                    ) : (
                        <button
                            className="w-full font-semibold py-2 transition-all hover:bg-white/5"
                            onClick={() => dispatch({ type: 'load' })}
                        >
                            More...
                        </button>
                    )}
                </div>
            </MainSection>
        </UserProfile>
    );
}
Home.layout = 'user';
