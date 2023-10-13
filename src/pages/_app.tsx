import { useEffect } from 'react';

import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { session } from '@/mock/session';
import { posts } from '@/mock/posts';

import { usePosts } from '@/utils/atom';

import '@/styles/globals.css';

interface AppPropsWithComponentLayout extends AppProps {
    Component: NextComponentType & { layout: keyof typeof layouts };
}

const layouts = {
    default: dynamic(() => import('../layouts/default'), { ssr: false }),
    app: dynamic(() => import('../layouts/app'), { ssr: false }),
    user: dynamic(() => import('../layouts/user'), { ssr: false }),
};

export default function App({
    Component,
    pageProps,
}: AppPropsWithComponentLayout) {
    const Layout = layouts[Component.layout || 'default'];

    const { push } = useRouter();

    const [post, setPost] = usePosts();

    if (!session) {
        push('/');
        console.log('Error: UNAUTHORIZED');
    }

    const initialPosts = posts;

    useEffect(() => {
        setPost(initialPosts);
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
