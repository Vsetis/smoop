import { useUser } from '@/utils/atom';
import { useRouter } from 'next/router';

import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/Mobile/MobileSidebar';
import MobileNav from '@/components/Mobile/MobileNav';
import Navbar from '@/components/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useUser();
    const { push } = useRouter();

    if (!user) {
        push('/');
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row min-h-[100vh] justify-between">
            <Sidebar />
            <MobileSidebar />
            <div className="w-full">
                <Navbar />
                <div>{children}</div>
            </div>
            <MobileNav />
        </div>
    );
}
