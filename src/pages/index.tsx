import { useRouter } from 'next/router';
import { useUser } from '@/utils/atom';

export default function Home() {
    const [user, setUser] = useUser();
    const { push } = useRouter();

    if (!!user) {
        push('/home');
    }

    return (
        <div className="h-screen container mx-auto flex flex-col justify-center items-center ">
            <div className="relative rounded-full  p-4">
                <div className="p-8 rounded-full bg-gradient-to-b from-black/5 to-black/50">
                    <img src="/logo.svg" alt="Smoop logo" />
                </div>
                <div className="absolute w-full h-full rounded-full bg-purple-900 top-0 left-0 blur-[80px] z-[-1]" />
            </div>

            <div className="flex flex-col items-center  p-4 rounded">
                <h1 className="mb-2 font-semibold text-3xl text-transparent bg-gradient-to-r from-white/80 to-white/60 bg-clip-text leading-snug">
                    Welcome to smoop
                </h1>
                <p className="mb-6 text-center text-sm font-semibold text-white/80">
                    Social network app, click the button below to view demo.
                </p>
                <button
                    onClick={() =>
                        setUser({
                            username: 'guest',
                            name: 'guest',
                            bio: 'Amazing bio!',
                            avatar: null,
                        })
                    }
                    className="text-white/80 font-semibold bg-purple-800 py-2 px-6 rounded transition-all hover:bg-purple-700"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
