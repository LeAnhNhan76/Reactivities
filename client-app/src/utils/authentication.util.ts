import { SettingKeyConstants } from "../constants/setting.constant"
import { getLocalStorageItem, setLocalStorageItem } from "./localStorage.util"
import { getSessionStorageItem, setSessionStorageItem } from "./sessionStorage.util";
import { isStrNotNullOrUndefined } from "./string.util";

const hasToken = () => {
    const token = getToken();
    return isStrNotNullOrUndefined(token);
}

const getToken = () => {
    return getLocalStorageItem(SettingKeyConstants.AccessToken) || getSessionStorageItem(SettingKeyConstants.AccessToken) || ''
}

const setToken = (token: string) => {
    const rememberMe = true;
    if (rememberMe) {
        setLocalStorageItem(SettingKeyConstants.AccessToken, token);
    }
    else {
        setSessionStorageItem(SettingKeyConstants.AccessToken, token);
    }
}

export {
    hasToken,
    getToken,
    setToken
}