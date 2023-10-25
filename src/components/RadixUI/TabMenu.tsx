import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

export default function TabMenu({
    tab,
    setTab,
    tabs,
}: {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
    tabs: { title: string; tab: string; children: React.ReactNode }[];
}) {
    const [index, setIndex] = useState(0);
    return (
        <Tabs.Root
            defaultValue={tab}
            className="flex w-full min-h-[600px] gap-12"
        >
            <Tabs.List
                className={`${
                    tab === null ? '' : 'hidden sm:flex flex-col'
                } sticky w-full top-0 left-0 h-screen border-r  border-white/20 sm:w-1/2 xl:w-[400px]`}
                aria-label="Manage your account"
            >
                {tabs.map((t, i) => (
                    <Tabs.Trigger
                        key={i}
                        onClick={() => {
                            setTab(tabs[i].tab);
                            setIndex(i);
                        }}
                        className="bg-black h-[45px] text-start flex items-center p-8 text-[15px] data-[state=active]:border-r-[2px] data-[state=active]:bg-white/5 border-purple-800 w-full"
                        value={t.tab}
                    >
                        {t.title}
                        {tabs[i].tab}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            <div
                className={`${
                    tab === null ? 'hidden sm:flex' : ''
                } my-8  w-full px-4 md:px-8 xl:max-w-[700px]`}
            >
                <Tabs.Content
                    className="w-full flex flex-col gap-8 "
                    value={tab}
                >
                    {tabs[index].children}
                </Tabs.Content>
            </div>
        </Tabs.Root>
    );
}
