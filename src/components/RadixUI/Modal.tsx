import * as Dialog from '@radix-ui/react-dialog';

export default function Modal({
    open,
    setOpen,
    triggerButton,
    children,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerButton: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
                onClick={(e) => e.stopPropagation()}
                className="w-auto"
            >
                {triggerButton}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-gray-700/50 fixed inset-0 z-[50]" />
                <Dialog.Content className="bg-black min-w-[550px] rounded fixed top-[20%] left-1/2 z-[55] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[50px] max-h-[85vh] ">
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
