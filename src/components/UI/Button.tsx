type ButtonProps = {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'xl';
    color?: string;
    outline?: boolean;
    transparent?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    children,
    size,
    outline,
    color,
    transparent,
    className,
    ...props
}: ButtonProps) {
    const sizeClasses =
        size === 'xs'
            ? 'text-sm px-4 py-1'
            : size === 'sm'
            ? 'px-3 py-1'
            : size === 'md'
            ? 'px-6 py-2'
            : size === 'xl'
            ? '!w-full py-1'
            : 'py-1';
    const outlineClass = outline
        ? 'border border-purple-700 hover:bg-purple-700/20'
        : 'border border-transparent text-white/80 bg-purple-800 hover:bg-purple-700 ';

    const transparentClass = transparent && '!bg-transparent';
    const buttonClass = `${sizeClasses} ${className} ${outlineClass} ${transparentClass} font-semibold rounded transition-all h-max text-white/80 hover:text-white`;

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
}
