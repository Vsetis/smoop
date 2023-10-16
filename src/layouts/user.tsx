import MobileNav from '@/components/Mobile/MobileNav';
import MobileSidebar from '@/components/Mobile/MobileSidebar';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useUser } from '@/utils/atom';
import { useRouter } from 'next/router';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useUser();
    const { push } = useRouter();

    if (!user) {
        push('/');
        return null;
    }

    return (
        <div className="md:flex">
            <Sidebar />
            <MobileSidebar />
            <div className="w-full ">
                <Navbar />
                <div className="relative h-64">
                    <div className="absolute w-full h-full bg-gradient-to-r from-emerald-500/40 via-purple-900 to-cyan-700 top-0 left-0" />
                </div>
                <div className="container mx-auto px-2 md:px-4 mt-8">
                    {children}
                </div>
                <MobileNav />
            </div>
        </div>
    );
}
