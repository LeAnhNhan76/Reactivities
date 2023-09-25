// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, observable } from "mobx";
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

    @action async follow(userId: string) {
        this.showLoading();
        try {
            const actionResult = await agent.Followers.follow(userId);
            return actionResult;
        } catch (error) {
            console.log('Error api', error);
            this.hideLoading();
        }
        finally {
            this.hideLoading();
        }
    }

    @action async unfollow(userId: string) {
        this.showLoading();
        try {
            const actionResult = await agent.Followers.unfollow(userId);
            return actionResult;
        } catch (error) {
            console.log('Error api', error);
            this.hideLoading();
        }
        finally {
            this.hideLoading();
        }
    }
}