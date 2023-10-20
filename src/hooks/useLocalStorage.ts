export const useLocalStorage = (key: string, initialValue: unknown[]) => {
    const getItems = () => {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        } else {
            return initialValue;
        }
    };

    const setItems = (array: unknown[]) => {
        window.localStorage.setItem(key, JSON.stringify(array));
    };

    const removeItem = (value: unknown) => {
        const array = getItems();
        const index = array.indexOf(value);
        if (index !== -1) {
            array.splice(index, 1);
            setItems(array);
        }
    };

    return { getItems, setItems, removeItem };
};
