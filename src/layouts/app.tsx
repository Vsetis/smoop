import { useUser } from '@/utils/atom';
import { useRouter } from 'next/router';

import Sidebar from '@/components/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useUser();
    const { push } = useRouter();

    if (!user) {
        push('/');
        return null;
    }

    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    );
}
