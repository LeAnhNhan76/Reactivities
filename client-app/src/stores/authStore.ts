
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { SettingKeyConstants } from "../constants/setting.constant";
import { LoginType } from "../types/login.type";
import { removeLocalStorageItem, setLocalStorageItem } from "../utils/localStorage.util";

export default class AuthStore {
    @observable isLoading: boolean = false;

    @action showLoading() {
        this.isLoading = true;
    }

    @action hideLoading() {
        this.isLoading = false;
    }

    @action async login(data: LoginType) {
        try {
            this.showLoading();
            const response = await agent.Account.login(data);
            if (response) {
                if (response.isLoggedIn) {
                    setLocalStorageItem(SettingKeyConstants.AccessToken, response.token);
                    setLocalStorageItem(SettingKeyConstants.AuthenProfile, JSON.stringify(response));
                }
            }
            runInAction(() => {
                this.hideLoading();
            });
            return response && response?.isLoggedIn;
        }
        catch (err) {
            this.hideLoading();
            return false;
        }
    }

    @action logout() {
        removeLocalStorageItem(SettingKeyConstants.AccessToken);
        removeLocalStorageItem(SettingKeyConstants.AuthenProfile);
    }
}