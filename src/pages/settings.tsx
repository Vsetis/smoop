import { useEffect, useRef, useState } from 'react';
import { useUser, useUsers } from '@/utils/atom';

import * as Switch from '@radix-ui/react-switch';
import Avatar from '@/components/UI/Avatar';
import Button from '@/components/UI/Button';
import { useKey } from '@/hooks/useKey';
import TabMenu from '@/components/RadixUI/TabMenu';

function InputButton({
    title,
    value,
    type,
    current,
    onClick,
}: {
    title: string;
    value: string;
    current: string;
    type: 'username' | 'name' | 'email' | 'phone';
    onClick: () => void;
}) {
    const [inputValue, setValue] = useState(value);
    const [user, setUser] = useUser();
    const [users, setUsers] = useUsers();
    const [disabled, setDisabled] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isCurrent, setCurrent] = useState('');

    useEffect(() => {
        setCurrent(current);
        !disabled && inputRef.current?.focus();
    }, [current, disabled]);

    useEffect(() => {
        if (type === isCurrent) {
            setDisabled(false);
        } else {
            setDisabled(true);
            setValue(value);
        }
    }, [isCurrent]);

    const handleClick = () => {
        onClick();

        if (user) {
            if (inputValue.length > 3) {
                setUsers((prevUsers) => {
                    return prevUsers.map((u) => {
                        if (u?.id === user.id) {
                            switch (type) {
                                case 'username':
                                    setUser({ ...user, username: inputValue });
                                    return { ...u, username: inputValue };
                                case 'name':
                                    setUser({ ...user, name: inputValue });
                                    return {
                                        ...u,
                                        name: inputValue.replace('@', ''),
                                    };
                                case 'email':
                                    setUser({ ...user, email: inputValue });
                                    return { ...u, email: inputValue };
                                case 'phone':
                                    setUser({ ...user, phone: inputValue });
                                default:
                                    return u;
                            }
                        }
                        return u;
                    });
                });
                setDisabled(true);
            } else {
                alert(`${type} must have at least 3 characters!`);
            }
        }
    };

    useKey('Enter', handleClick, !disabled);

    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <p className="font-semibold text-sm">{title}</p>
                <input
                    ref={inputRef}
                    className="bg-transparent text-white focus:outline-none"
                    value={inputValue}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={disabled}
                    type="text"
                />
            </div>
            <Button size="xs" outline onClick={handleClick}>
                {disabled ? 'Edit' : 'Save'}
            </Button>
        </div>
    );
}

function SettingsProfileCard({
    username,
    name,
    avatar,
    email,
    phone,
}: {
    username: string;
    name: string;
    avatar: string | null;
    email?: string;
    phone?: string;
}) {
    const [current, setCurrent] = useState('');
    return (
        <div className="rounded w-full bg-black border border-white/20 h-max">
            <div className="bg-gradient-to-r from-purple-700 via-blue-500 to-emerald-800 h-[100px] rounded-t"></div>
            <div className="px-4">
                <div className="flex justify-between items-center gap-4 px-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-black p-[4px] translate-y-[-32px] rounded-full">
                            <Avatar
                                size="xl"
                                avatar={avatar}
                                username={username}
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-lg xl:text-xl font-semibold">
                                {username}
                            </p>
                            <p className="text-white/70 text-sm xl:text-base">
                                @{name}
                            </p>
                        </div>
                    </div>
                    <Button size="sm">Edit profile</Button>
                </div>
            </div>
            <div className="border border-white/10 m-4 rounded p-4">
                <InputButton
                    onClick={() =>
                        current !== 'username'
                            ? setCurrent('username')
                            : setCurrent('')
                    }
                    type="username"
                    title="username"
                    value={username}
                    current={current}
                />
                <InputButton
                    onClick={() =>
                        current !== 'name' ? setCurrent('name') : setCurrent('')
                    }
                    type="name"
                    title="name"
                    value={`@${name}`}
                    current={current}
                />
                <InputButton
                    onClick={() =>
                        current !== 'email'
                            ? setCurrent('email')
                            : setCurrent('')
                    }
                    type="email"
                    title="email"
                    value={email || 'unset'}
                    current={current}
                />
                <InputButton
                    onClick={() =>
                        current !== 'phone'
                            ? setCurrent('phone')
                            : setCurrent('')
                    }
                    type="phone"
                    title="phone"
                    value={phone || 'unset'}
                    current={current}
                />
            </div>
        </div>
    );
}

function SettingsProfile({
    username,
    name,
    avatar,
    email,
    phone,
}: {
    username: string;
    name: string;
    avatar: string | null;
    email?: string;
    phone?: string;
}) {
    return (
        <>
            <h2 className="text-2xl font-semibold text-white/80">My Account</h2>
            <SettingsProfileCard
                username={username}
                name={name}
                avatar={avatar || null}
                email={email}
                phone={phone}
            />
            <div className="border-y border-white/20  py-8">
                <h2 className="text-xl mb-4 font-semibold text-white/80">
                    Password
                </h2>
                <Button
                    size="md"
                    outline
                    onClick={() =>
                        alert('You can not change password as Guest!')
                    }
                >
                    Edit Password
                </Button>
            </div>
            <div>
                <p className="text-xl font-semibold text-white/80 mb-2">
                    Remove Account
                </p>
                <p className="mb-4 text-white/80 text-sm">
                    You can not delete your account as Guest!
                </p>
                <Button
                    onClick={() =>
                        alert('You can not remove an account as Guest!')
                    }
                    size="md"
                    outline
                    className="!border-red-600 hover:!bg-red-600/20"
                >
                    Remove Account
                </Button>
            </div>
        </>
    );
}

function Privacy() {
    const [tagging, setTagging] = useState(false);
    const [option, setOption] = useState('one');
    return (
        <>
            <h2 className="text-2xl font-semibold text-white/80">Privacy</h2>
            <div className="flex items-center w-full justify-between gap-8">
                <div className="py-4">
                    <p className="font-semibold text-sm mb-2 text-white/80">
                        Protect your posts
                    </p>
                    <p className="text-sm text-white/80">
                        When selected, your posts and other account information
                        are only visible to people who follow you.
                    </p>
                </div>
                <div>
                    <Switch.Root className="w-[42px] h-[25px] rounded-full relative shadow-purple-700 shadow-[0_2px_10px]  outline-none cursor-default data-[state=checked]:bg-purple-800">
                        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                </div>
            </div>
            <div className="flex items-center w-full justify-between gap-8">
                <div className="py-4">
                    <p className="font-semibold text-sm mb-2 text-white/80">
                        Post tagging
                    </p>
                    <p className="text-sm text-white/80">
                        Allow people to tag you in their posts and receive
                        notifications when they do so.
                    </p>
                </div>
                <div>
                    <Switch.Root
                        onClick={() => setTagging(!tagging)}
                        checked={tagging}
                        className="w-[42px] h-[25px] rounded-full relative shadow-purple-700 shadow-[0_2px_10px]  outline-none cursor-default data-[state=checked]:bg-purple-800"
                    >
                        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                </div>
            </div>
            <div className={`${tagging ? '' : 'hidden'} px-4  xl:w-1/2`}>
                <form>
                    <div className="flex items-center justify-between">
                        <p className=" text-white/80 mb-2">
                            Anyone can tag you
                        </p>
                        <input
                            onChange={() => {}}
                            className="w-4 h-4 accent-purple-600 "
                            onFocus={() => setOption('one')}
                            checked={option === 'one'}
                            type="radio"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className=" text-white/80">
                            Only people you follow can tag you
                        </p>
                        <input
                            onChange={() => {}}
                            name="colored-radio"
                            className="w-4 h-4 accent-purple-600 "
                            onFocus={() => setOption('two')}
                            checked={option === 'two'}
                            type="radio"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default function SettingsPage() {
    const [user] = useUser();
    const [tab, setTab] = useState('1');

    return (
        <>
            <TabMenu
                tab={tab}
                setTab={setTab}
                tabs={[
                    {
                        title: 'My Account',
                        tab: '1',
                        children: (
                            <SettingsProfile
                                username={user!.username}
                                name={user!.name}
                                avatar={user!.avatar || null}
                                email={user!.email}
                                phone={user!.phone}
                            />
                        ),
                    },
                    {
                        title: 'Privacy',
                        tab: '2',
                        children: <Privacy />,
                    },
                ]}
            />
        </>
    );
}

SettingsPage.layout = 'app';
