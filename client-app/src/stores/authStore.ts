import { action, observable } from "mobx";
import agent from "../api/agent";
import { SystemConstants } from "../constants/setting.constanst";
import { LoginModel } from "../models/login.model";
import { isValid } from "../utils/string.utils";
import BaseStore from "./baseStore";

export default class AuthStore extends BaseStore {
  @observable loggedIn: boolean | undefined = undefined;

  @action login = async (model: LoginModel) => {
    this.showLoading();
    try 
    {
      const loginResult = await agent.Account.login(model);

      this.loggedIn = loginResult && loginResult.isLoggedIn && loginResult.token !== '';
  
      if(this.loggedIn) {
        localStorage.setItem(SystemConstants.Token, loginResult.token);
      }
      this.hideLoading();
    }
    catch(err) {
      this.loggedIn = false;
      this.hideLoading();
    }
  }

  @action isAlreadyLoggedIn = () => {
    const token = localStorage.getItem(SystemConstants.Token);

    return isValid(token);
  }
}