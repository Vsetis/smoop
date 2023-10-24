type ButtonProps = {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'xl';
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
        size === 'sm'
            ? 'px-2 py-1'
            : size === 'md'
            ? 'px-6 py-2'
            : size === 'xl'
            ? '!w-full py-1'
            : 'py-1';
    const outlineClass = outline
        ? 'border border-white'
        : 'border border-transparent text-white/80 bg-purple-800 hover:bg-purple-700 hover:text-white';

    const transparentClass = transparent && '!bg-transparent';
    const buttonClass = `${sizeClasses} ${className} ${outlineClass} ${transparentClass} font-semibold rounded transition-all`;

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
}
