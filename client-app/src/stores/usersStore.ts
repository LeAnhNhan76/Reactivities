import { observable, action } from "mobx";
import agent from "../api/agent";

export default class UsersStore {
    @observable isLoading: boolean = false;

    @action showLoading() {
        this.isLoading = true;
    }

    @action hideLoading() {
        this.isLoading = false;
    }

    @action async getInfoByAvatar(userId: string) {
        try {
            const info = await agent.Users.getInfoByAvatar(userId);
            console.log('info', info);
            return info;
        }
        catch(error) {
            console.log('Error api: ', error);   
        }
    }
}