export const useLocalStorage = (key:string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setltem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = () => {
        try {
            const item : string | null = window.localStorage.getltem(key);

            return item ? JSON.stringify(item) : null;
        } catch (e) {
            console.log(e);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeltem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem };
};