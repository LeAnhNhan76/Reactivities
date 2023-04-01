import { action, observable } from "mobx";

export default class BaseStore {
    @observable isLoading: boolean = false;

    @action showLoading () {
        this.isLoading = true;
    }

    @action hideLoading () {
        this.isLoading = false;
    }
}