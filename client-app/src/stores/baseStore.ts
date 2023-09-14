import { action, observable } from "mobx";

export default class BaseStore {
    @observable isLoading: boolean = false;

    @action showLoading () {
        this.isLoading = true;
    }

    @action hideLoading () {
        this.isLoading = false;
    }

    protected async performAnApiAction (action: any, handleError?: any) {
      try {
        if (action && typeof(action) === 'function') {
          await action();
        }
      } catch (error) {
        if (handleError && typeof(handleError) === 'function') {
          handleError();
        }
      }
    }

    protected async performAnApiActionWithLoading (action: any, handleError?: any) {
      try {
        this.showLoading();
        if (action && typeof(action) === 'function') {
          await action();
        }
        this.hideLoading();
      } catch (error) {
        if (handleError && typeof(handleError) === 'function') {
          handleError();
        }
        this.hideLoading();
      }
    }
}