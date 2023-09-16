import { SettingKeyConstants } from "../constants/setting.constant"
import { LoginResultType } from "../types/login.type";
import { getLocalStorageItem, setLocalStorageItem } from "./localStorage.util"
import { getSessionStorageItem, setSessionStorageItem } from "./sessionStorage.util";
import { isStrNotNullOrUndefined } from "./string.util";

const hasToken = () => {
    const token = getToken();
    console.log('token', token)
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

const getAuthenProfile = () => {
    const authenProfile = getLocalStorageItem(SettingKeyConstants.AuthenProfile);
    if (!isStrNotNullOrUndefined(authenProfile)) return undefined;

    return JSON.parse(authenProfile || '') as LoginResultType;
}

export {
    hasToken,
    getToken,
    setToken,
    getAuthenProfile
}