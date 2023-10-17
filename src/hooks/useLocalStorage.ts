export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            const existingData = window.localStorage.getItem(key);
            const dataArray = existingData ? JSON.parse(existingData) : [];
            dataArray.push(value);
            window.localStorage.setItem(key, JSON.stringify(dataArray));
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = () => {
        try {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = (value: unknown) => {
        try {
            const data = window.localStorage.getItem(key) || '[]';
            const dataArray = JSON.parse(data);
            const updatedArray = dataArray.filter(
                (item: unknown) => item !== value
            );

            window.localStorage.setItem(key, JSON.stringify(updatedArray));
        } catch (error) {
            console.log(error);
        }
    };

    const removeAll = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem, removeAll };
};
