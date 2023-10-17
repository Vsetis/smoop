import { useEffect } from 'react';

export const useSearch = (
    searchingArea: React.RefObject<HTMLDivElement>,
    setSearching: React.Dispatch<boolean>
) => {
    useEffect(() => {
        function Search(e: MouseEvent) {
            const target = e.target as Node;

            if (!searchingArea.current?.contains(target)) {
                setSearching(false);
            }
        }

        document.addEventListener('mousedown', Search);

        return () => document.removeEventListener('mousedown', Search);
    }, []);
};
