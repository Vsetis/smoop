import Image from 'next/image';
import { useState } from 'react';

import { useUser } from '@/utils/atom';

import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';

import { IconArrowBack } from '@tabler/icons-react';

function SettingsProfileCard({
    username,
    name,
    avatar,
}: {
    username: string;
    name: string;
    avatar: string | null;
}) {
    return (
        <div className="rounded w-full bg-black border border-white/20 h-max">
            <div className="bg-gradient-to-r from-purple-700 via-blue-500 to-emerald-800 h-[100px] rounded-t"></div>
            <div className="flex justify-between items-center gap-4 px-4">
                <div className="flex items-center gap-4">
                    <div className="bg-black p-[4px] translate-y-[-32px] rounded-full">
                        {!!avatar ? (
                            <Image
                                width={80}
                                height={80}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                                src={avatar}
                                alt={`${username} profile avatar`}
                            ></Image>
                        ) : (
                            <div className=" rounded-full w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                        )}
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
            <div className="border border-white/10 m-4 rounded p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="font-semibold text-sm">username</p>
                        <p>{username}</p>
                    </div>
                    <button className="px-4 py-1 md:px-6 text-sm text-white/80 border border-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600/20 hover:text-white">
                        Edit
                    </button>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="font-semibold text-sm">name</p>
                        <p>{name}</p>
                    </div>
                    <button className="px-4 py-1 md:px-6 text-sm text-white/80 border border-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600/20 hover:text-white">
                        Edit
                    </button>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="font-semibold text-sm">email</p>
                        <p>unset</p>
                    </div>
                    <button className="px-4 py-1 md:px-6 text-sm text-white/80 border border-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600/20 hover:text-white">
                        Edit
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-sm">phone</p>
                        <p>unset</p>
                    </div>
                    <button className="px-4 py-1 md:px-6 text-sm text-white/80 border border-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600/20 hover:text-white">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    const [user, setUser] = useUser();
    const [tagging, setTagging] = useState(false);
    const [option, setOption] = useState('one');

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
                        <button
                            className="w-max p-1 border border-white/20 rounded sm:hidden"
                            onClick={() => setTab('')}
                        >
                            <IconArrowBack />
                        </button>
                        <h2 className="text-2xl font-semibold text-white/80">
                            My Account
                        </h2>
                        <SettingsProfileCard
                            username={user!.username}
                            name={user!.name}
                            avatar={user!.avatar || null}
                        />
                        <div className="border-y border-white/20  py-8">
                            <h2 className="text-xl mb-4 font-semibold text-white/80">
                                Password
                            </h2>
                            <button className="px-6 py-2 text-white/80 border border-purple-700 rounded h-max font-semibold transition-all hover:bg-purple-600/20 hover:text-white">
                                Edit Password
                            </button>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white/80 mb-2">
                                Remove Account
                            </p>
                            <p className="mb-4 text-white/80 text-sm">
                                You can not delete your account as Guest!
                            </p>
                            <button className="px-6 py-2 text-white/80 border border-red-600 rounded h-max font-semibold transition-all hover:bg-red-600/20 hover:text-white">
                                Remove Account
                            </button>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content
                        className="w-full flex flex-col gap-4"
                        value="tab2"
                    >
                        <button
                            className="w-max p-1 border border-white/20 rounded sm:hidden"
                            onClick={() => setTab('')}
                        >
                            <IconArrowBack />
                        </button>
                        <h2 className="text-2xl font-semibold text-white/80">
                            Privacy
                        </h2>
                        <div className="flex items-center w-full justify-between gap-8">
                            <div className="py-4">
                                <p className="font-semibold text-sm mb-2 text-white/80">
                                    Protect your posts
                                </p>
                                <p className="text-sm text-white/80">
                                    When selected, your posts and other account
                                    information are only visible to people who
                                    follow you.
                                </p>
                            </div>
                            <div>
                                {' '}
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
                                    Allow people to tag you in their posts and
                                    receive notifications when they do so.
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
                        <div
                            className={`${
                                tagging ? '' : 'hidden'
                            } px-4  xl:w-1/2`}
                        >
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
                    </Tabs.Content>
                </div>
            </Tabs.Root>
        </>
    );
}

SettingsPage.layout = 'app';
