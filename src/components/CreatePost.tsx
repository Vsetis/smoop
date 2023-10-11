import Image from 'next/image';
export default function CreatePost({
    avatar,
    username,
}: {
    avatar: string | null;
    username: string;
}) {
    return (
        <>
            <div>
                <div className="flex gap-8 ">
                    <div>
                        {!!avatar ? (
                            <Image
                                width={40}
                                height={40}
                                className="rounded-full mb-2"
                                src={avatar}
                                alt={`${username} profile avatar`}
                            ></Image>
                        ) : (
                            <div className="mb-2 rounded-full w-14 h-14 bg-gradient-to-b from-purple-700 via-blue-500 to-emerald-800" />
                        )}
                    </div>
                    <textarea
                        className="w-full flex bg-transparent min-h-[200px] overflow-auto resize-none text-2xl focus:outline-none"
                        name=""
                        placeholder="What's on your mind?"
                        maxLength={280}
                    ></textarea>
                </div>
                <div className="border-t border-white/20 pt-4">
                    <button className="bg-purple-700 px-4 py-1 font-semibold rounded transition-all hover:bg-purple-600 ml-auto flex">
                        Post
                    </button>
                </div>
            </div>
        </>
    );
}
