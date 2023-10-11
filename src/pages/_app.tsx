import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { session } from '@/mock/session';

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

    if (!session) {
        push('/');
        console.log('Error: UNAUTHORIZED');
    }

    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
