import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Dropdown({
    triggerButton,
    children,
}: {
    triggerButton: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    {triggerButton}
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="w-max bg-zinc-800 rounded py-2 text-white/80">
                        <DropdownMenu.Item className="hover:outline-none">
                            {children}
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
}
