// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observable, action } from "mobx";
import { ToastPosition } from "../types/toast.type";
import { DefaultToast } from "../constants/common.constant";

export default class CommonStore {
    @observable toastPosition: ToastPosition = DefaultToast.Position;

    @action setToastPosition(position: ToastPosition) {
        this.toastPosition = position;
    }

    @action resetToastPosition() {
        this.toastPosition = DefaultToast.Position;
    }
}