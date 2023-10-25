import { useRouter } from 'next/router';
import { useUser, useUsers } from '@/utils/atom';

import Button from '@/components/UI/Button';

export default function Home() {
    const [users, setUsers] = useUsers();
    const [user, setUser] = useUser();
    const { push } = useRouter();

    if (!!user) {
        users.push(user);
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
                <Button
                    size="md"
                    onClick={() =>
                        setUser({
                            id: '0ffaafa4-4b9e-4a46-81c8-64e1a6bb4db80xcvdsfsdf',
                            username: 'guest',
                            name: 'guest',
                            email: 'guest@smoop.cz',
                            avatar: null,
                            bio: 'amazing!',
                            followed: [],
                            following: [],
                        })
                    }
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
