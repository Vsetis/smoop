import { useEffect, useRef, useState } from 'react';

import { useUser } from '@/utils/atom';

import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';

import Avatar from '@/components/UI/Avatar';

function InputButton({
    title,
    value,
    type,
}: {
    title: string;
    value: string;
    type: 'username' | 'name' | 'email' | 'phone';
}) {
    const [disabled, setDisabled] = useState(true);
    const [inputValue, setValue] = useState(value);
    const [user, setUser] = useUser();

    const Ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        !disabled && Ref.current?.focus();
    }, [disabled]);

    const handleClick = () => {
        setDisabled(false);

        if (disabled === false) {
            console.log('saved');

            if (user) {
                const updatedUser = { ...user };
                switch (type) {
                    case 'username':
                        updatedUser.username = inputValue;
                        break;
                    case 'name':
                        updatedUser.name = inputValue.replace('@', '');
                        break;
                    case 'email':
                        updatedUser.email = inputValue;
                        break;
                    case 'phone':
                        break;
                    default:
                        break;
                }

                if (inputValue.length > 3) {
                    setUser(updatedUser);
                    setDisabled(true);
                } else {
                    alert(`${type} must have atleast 3 characters!`);
                }
            }
        }
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !disabled) {
                handleClick();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [disabled, handleClick]);

    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <p className="font-semibold text-sm">{title}</p>
                <input
                    ref={Ref}
                    className="bg-transparent text-white focus:outline-none"
                    value={inputValue}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={disabled}
                    type="text"
                />
            </div>
            <button
                onClick={handleClick}
                className="px-4 py-1 md:px-6 text-sm text-white/80 border border-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600/20 hover:text-white"
            >
                {disabled ? 'Edit' : 'Save'}
            </button>
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
                    <button className="px-3 py-1 xl:px-4 bg-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600 text-sm xl:text-base">
                        Edit profile
                    </button>
                </div>
            </div>
            <div className="border border-white/10 m-4 rounded p-4">
                <InputButton
                    type="username"
                    title="username"
                    value={username}
                />
                <InputButton type="name" title="name" value={`@${name}`} />
                <InputButton
                    type="email"
                    title="email"
                    value={email || 'unset'}
                />
                <InputButton
                    type="phone"
                    title="phone"
                    value={phone || 'unset'}
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
                <button
                    onClick={() =>
                        alert('You can not change password as Guest!')
                    }
                    className="px-6 py-2 text-white/80 border border-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600/20 hover:text-white"
                >
                    Edit Password
                </button>
            </div>
            <div>
                <p className="text-xl font-semibold text-white/80 mb-2">
                    Remove Account
                </p>
                <p className="mb-4 text-white/80 text-sm">
                    You can not delete your account as Guest!
                </p>
                <button
                    onClick={() =>
                        alert('You can not remove an account as Guest!')
                    }
                    className="px-6 py-2 text-white/80 border border-red-600 rounded h-max font-semibold transition-all hover:bg-red-600/20 hover:text-white"
                >
                    Remove Account
                </button>
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
    const [user, setUser] = useUser();
    const [tab, setTab] = useState('tab1');

    return (
        <>
            <Tabs.Root
                defaultValue={tab}
                className="flex w-full min-h-[600px] gap-12"
            >
                <Tabs.List
                    className={`${
                        tab === '' ? '' : 'hidden sm:flex flex-col'
                    } sticky w-full top-0 left-0 min-h-screen border-r  border-white/20 sm:w-1/2 xl:w-[30%]`}
                    aria-label="Manage your account"
                >
                    <Tabs.Trigger
                        onClick={() => setTab('tab1')}
                        className="bg-black h-[45px] text-start flex items-center p-8 text-[15px] data-[state=active]:border-r-[2px] data-[state=active]:bg-white/5 border-purple-800 w-full"
                        value="tab1"
                    >
                        My Account
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        onClick={() => setTab('tab2')}
                        className="bg-black h-[45px] text-start flex items-center p-8 text-[15px] data-[state=active]:border-r-[2px] data-[state=active]:bg-white/5 border-purple-800 w-full"
                        value="tab2"
                    >
                        Privacy
                    </Tabs.Trigger>
                </Tabs.List>

                <div
                    className={`${
                        tab === '' ? 'hidden sm:flex' : ''
                    } my-8  w-full px-4 md:px-8 xl:max-w-[700px]`}
                >
                    <Tabs.Content
                        className="w-full flex flex-col gap-8 "
                        value="tab1"
                    >
                        <SettingsProfile
                            username={user!.username}
                            name={user!.name}
                            avatar={user!.avatar || null}
                            email={user!.email}
                            phone={user!.phone}
                        />
                    </Tabs.Content>
                    <Tabs.Content
                        className="w-full flex flex-col gap-4"
                        value="tab2"
                    >
                        <Privacy />
                    </Tabs.Content>
                </div>
            </Tabs.Root>
        </>
    );
}

SettingsPage.layout = 'app';
