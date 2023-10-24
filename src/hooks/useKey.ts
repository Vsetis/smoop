import { useEffect } from 'react';

export const useKey = (
    key: string,
    handleFunction: () => void,
    condition?: boolean
) => {
    useEffect(() => {
        const handlePress = (e: KeyboardEvent) => {
            if ((e.key === key && condition) || null) {
                handleFunction();
            }
        };
        document.addEventListener('keydown', handlePress);

        return () => {
            document.removeEventListener('keydown', handlePress);
        };
    }, [handleFunction]);
};
