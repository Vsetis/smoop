import { useEffect, useState } from 'react';

export const useScroll = ({
    setVisible,
}: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [prevScroll, setScroll] = useState(0);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        setTimeout(() => {
            setVisible(true);

            if (currentScrollPos > prevScroll) {
                setVisible(false);
            }

            setScroll(currentScrollPos);
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScroll]);
};
