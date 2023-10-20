import * as Dialog from '@radix-ui/react-dialog';
import { IconX } from '@tabler/icons-react';

export default function Modal({
    open,
    setOpen,
    triggerButton,
    children,
    title,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerButton: React.ReactNode;
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
                onClick={(e) => e.stopPropagation()}
                className="w-max"
            >
                {triggerButton}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-gray-700/50 fixed inset-0 z-[50] flex justify-center pt-16">
                    <Dialog.Content className="bg-black inset-0 min-w-[600px] max-h-[50vh] h-max overflow-auto p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="mb-4 text-white/80 text-lg">
                                {title}
                            </h3>
                            <Dialog.Close asChild>
                                <button aria-label="Close">
                                    <IconX />
                                </button>
                            </Dialog.Close>
                        </div>
                        {children}
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
