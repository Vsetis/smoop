export default function MainSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded md:border border-white/20 w-full min-h-[calc(100vh-350px)]">
            <div className="p-2 md:p-4 border-white/20">
                <h2 className="font-semibold text-white/80">{title}</h2>
            </div>
            {children}
        </div>
    );
}
