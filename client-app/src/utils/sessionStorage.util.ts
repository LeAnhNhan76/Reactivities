import { generateLocalKeyByName } from "./localStorage.util";

const getSessionStorageItem = (key: string) => sessionStorage.getItem(generateLocalKeyByName(key));

const setSessionStorageItem = (key: string, value: string | undefined | null) => sessionStorage.setItem(generateLocalKeyByName(key), value || '');

const removeSessionStorageItem = (key: string) => sessionStorage.removeItem(generateLocalKeyByName(key));

export {
    getSessionStorageItem,
    setSessionStorageItem,
    removeSessionStorageItem
}