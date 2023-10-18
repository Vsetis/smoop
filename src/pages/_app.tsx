import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { useNotification, usePosts } from '@/utils/atom';

import '@/styles/globals.css';
import { posts } from '@/mock/posts';
import { notifications } from '@/mock/notifications';

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

    const [post, setPost] = usePosts();
    const [notification, setNotification] = useNotification();

    const initialPosts = posts;
    const initialNotifications = notifications;

    useEffect(() => {
        setPost(initialPosts);
        setNotification(initialNotifications);
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
