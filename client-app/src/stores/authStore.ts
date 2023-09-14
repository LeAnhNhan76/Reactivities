import { action, observable } from "mobx";
import agent from "../api/agent";
import { SystemConstants } from "../constants/setting.constanst";
import { LoginModel } from "../models/login.model";
import { getAuthInfo } from "../utils/localStorage.utils";
import { isValid } from "../utils/string.utils";
import BaseStore from "./baseStore";

export default class AuthStore extends BaseStore {
  @observable loggedIn: boolean | undefined = undefined;

  @action login = async (model: LoginModel) => {
    this.performAnApiActionWithLoading(async () => {
      const authInfo = await agent.Account.login(model);

      this.loggedIn = authInfo && authInfo.isLoggedIn && authInfo.token !== '';
  
      if(this.loggedIn) {
        localStorage.setItem(SystemConstants.AuthInfo, JSON.stringify(authInfo));
      }
    }, () => {
      this.loggedIn = false;
    })
  }

  @action signOut = async () => {
    localStorage.removeItem(SystemConstants.AuthInfo);
    this.loggedIn = undefined;
  }

  @action isAlreadyLoggedIn = () => {
    const authInfo = getAuthInfo();

    if (authInfo === null) return false;

    return authInfo.isLoggedIn && isValid(authInfo.token);
  }
}