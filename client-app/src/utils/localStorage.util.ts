import ApplicationSetting from '../constants/application.constant'

const generateLocalKeyByName = (name: string) => {
    return generateLocalKey(name);
}

const generateLocalKey = (key: string) => {
    return '{appName}.{env}.{key}'
        .replace('{appName}', ApplicationSetting.appName)
        .replace('{env}', ApplicationSetting.environment)
        .replace('{key}', key)
}

const getLocalStorageItem = (key: string) => localStorage.getItem(generateLocalKeyByName(key));

const setLocalStorageItem = (key: string, value: string | undefined | null) => localStorage.setItem(generateLocalKeyByName(key), value || '');

const removeLocalStorageItem = (key: string) => localStorage.removeItem(generateLocalKeyByName(key));

export {
    generateLocalKeyByName,
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem
}