export default function Tag({
    children,
    hover,
}: {
    children: React.ReactNode;
    hover: boolean;
}) {
    return (
        <p
            className={`${
                hover ? 'flex' : 'hidden'
            } absolute left-0 top-[2px] px-2 py-1 bg-zinc-800  rounded font-semibold text-sm translate-x-[32px]`}
        >
            {children}
        </p>
    );
}
