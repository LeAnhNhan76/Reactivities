
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observable, action, runInAction } from "mobx";
import { LoginResultType, LoginType } from "../types/login.type";
import agent from "../api/agent";
import { setLocalStorageItem } from "../utils/localStorage.util";
import { SettingKeyConstants } from "../constants/setting.constant";

export default class AuthStore {
    @observable loggedIn: boolean | undefined = undefined;
    @observable isLoading: boolean = false;
    @observable authProfile: LoginResultType | undefined = undefined;

    @action showLoading() {
        this.isLoading = true;
    }

    @action hideLoading() {
        this.isLoading = false;
    }

    @action setLoggedIn(value: boolean) {
        this.loggedIn = value;
    }

    @action setAuthenProfile(data: LoginResultType) {
        this.authProfile = { ...data };
    }

    @action async login(data: LoginType) {
        try {
            this.showLoading();
            const response = await agent.Account.login(data);
            console.log('response', response);
            if (response) {
                this.setLoggedIn(response.isLoggedIn);
                if (response.isLoggedIn) {
                    setLocalStorageItem(SettingKeyConstants.AccessToken, response.token);
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
}